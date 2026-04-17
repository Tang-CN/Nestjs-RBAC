import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'
import { Role } from '../role/role.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RedisService } from '@/shared/redis.service'
import { paginate, PageResult, PaginationQuery } from '@/common/utils/paginate'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: createUserDto.username }, { email: createUserDto.email }],
    })

    if (existingUser) {
      throw new ConflictException('用户名或邮箱已存在')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return await this.userRepository.save(user)
  }

  async findAll(query: PaginationQuery): Promise<PageResult<User>> {
    return await paginate(
      this.userRepository,
      {
        where: { isDeleted: 0 },
        relations: ['roles', 'roles.permissions'],
        order: { createdAt: 'DESC' },
      },
      query,
    )
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isDeleted: 0 },
      relations: ['roles', 'roles.permissions'],
    })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    return user
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username, isDeleted: 0 },
      relations: ['roles', 'roles.permissions'],
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    // 处理角色更新
    const { roleIds, ...updateData } = updateUserDto

    // 更新基本字段
    Object.assign(user, updateData)

    // 如果提供了 roleIds，更新用户角色
    if (roleIds !== undefined) {
      if (roleIds && roleIds.length > 0) {
        const roles = await this.roleRepository.findBy({
          id: In(roleIds),
        })
        user.roles = roles
      } else {
        user.roles = []
      }

      // 清除用户的token缓存，强制重新登录以刷新权限
      await this.redisService.del(`token:${id}`)
    }

    return await this.userRepository.save(user)
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    user.isDeleted = 1
    await this.userRepository.save(user)
  }

  async updateRoles(id: number, roleIds: number[]): Promise<User> {
    const user = await this.findOne(id)

    if (roleIds && roleIds.length > 0) {
      const roles = await this.roleRepository.findBy({
        id: In(roleIds),
      })
      user.roles = roles
    } else {
      user.roles = []
    }

    const updatedUser = await this.userRepository.save(user)

    // 清除用户的token缓存，强制重新登录以刷新权限
    await this.redisService.del(`token:${id}`)

    return updatedUser
  }
}
