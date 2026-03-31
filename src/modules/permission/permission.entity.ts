import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { Role } from '../role/role.entity'

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 100 })
  name: string

  @Column({ unique: true, length: 50 })
  code: string

  @Column({ length: 100, nullable: true })
  description: string

  @Column({ length: 50 })
  resource: string

  @Column({ length: 50 })
  action: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 0 })
  isDeleted: number

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
