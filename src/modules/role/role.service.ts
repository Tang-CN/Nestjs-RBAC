import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { Role } from './role.entity'
import { Permission } from '../permission/permission.entity'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: [{ name: createRoleDto.name }, { code: createRoleDto.code }],
    })

    if (existingRole) {
      throw new ConflictException('角色名称或编码已存在')
    }

    const role = this.roleRepository.create(createRoleDto)
    return await this.roleRepository.save(role)
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({
      where: { isDeleted: 0 },
      relations: ['permissions'],
    })
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id, isDeleted: 0 },
      relations: ['permissions'],
    })

    if (!role) {
      throw new NotFoundException('角色不存在')
    }

    return role
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id)
    Object.assign(role, updateRoleDto)
    return await this.roleRepository.save(role)
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id)
    role.isDeleted = 1
    await this.roleRepository.save(role)
  }

  async updatePermissions(id: number, permissionIds: number[]): Promise<Role> {
    const role = await this.findOne(id)

    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.permissionRepository.findBy({
        id: In(permissionIds),
      })
      role.permissions = permissions
    } else {
      role.permissions = []
    }

    return await this.roleRepository.save(role)
  }
}
