import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Role } from '../role/role.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 50 })
  username: string

  @Column({ unique: true, length: 100 })
  email: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 50, nullable: true })
  nickname: string

  @Column({ nullable: true })
  avatar: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 0 })
  isDeleted: number

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
