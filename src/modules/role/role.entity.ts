import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { User } from '../user/user.entity'
import { Permission } from '../permission/permission.entity'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 50 })
  name: string

  @Column({ unique: true, length: 50 })
  code: string

  @Column({ length: 100, nullable: true })
  description: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 0 })
  isDeleted: number

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
