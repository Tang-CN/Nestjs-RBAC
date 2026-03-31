import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Permission } from './permission.entity'
import { Role } from '../role/role.entity'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { RedisService } from '@/shared/redis.service'
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly redisService: RedisService,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findOne({
      where: { code: createPermissionDto.code },
    })

    if (existingPermission) {
      throw new ConflictException('权限编码已存在')
    }

    const permission = this.permissionRepository.create(createPermissionDto)
    return await this.permissionRepository.save(permission)
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: { isDeleted: 0 },
    })
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id, isDeleted: 0 },
    })

    if (!permission) {
      throw new NotFoundException('权限不存在')
    }

    return permission
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id)
    Object.assign(permission, updatePermissionDto)
    return await this.permissionRepository.save(permission)
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id)
    permission.isDeleted = 1
    await this.permissionRepository.save(permission)
  }

  async getTreeByRole(roleId: number): Promise<any> {
    const treeKey = 'permission:tree'
    const roleKey = `role:permissions:${roleId}`

    // 查权限树缓存
    let tree = await this.redisService.get(treeKey)
    if (tree) {
      if (typeof tree === 'string') {
        tree = JSON.parse(tree)
      } else {
        tree = null
      }
    } else {
      const allPermissions = await this.permissionRepository.find()
      tree = this.buildPermissionTree(allPermissions)

      await this.redisService.set(treeKey, JSON.stringify(tree), 300)
    }

    // 查角色权限缓存
    let checkedKeys = await this.redisService.get(roleKey)
    if (checkedKeys) {
      if (typeof checkedKeys === 'string') {
        checkedKeys = JSON.parse(checkedKeys)
      } else {
        checkedKeys = []
      }
    } else {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      })

      checkedKeys = role.permissions.map((item) => item.id)

      await this.redisService.set(roleKey, JSON.stringify(checkedKeys), 300)
    }

    return {
      tree,
      checkedKeys,
    }
  }

  buildPermissionTree = (allPermissions: any[]) => {
    const map = new Map()

    const resourceMap = {
      user: '用户管理',
      role: '角色管理',
      permission: '权限管理',
    }

    allPermissions
      .filter((item) => item.isActive && item.isDeleted === 0)
      .forEach((item) => {
        const { resource } = item

        if (!map.has(resource)) {
          map.set(resource, {
            label: resourceMap[resource] || resource,
            key: resource,
            children: [],
          })
        }

        map.get(resource).children.push({
          label: item.name,
          key: item.id, // 👈 核心字段
          code: item.code,
        })
      })

    return Array.from(map.values())
  }
}
