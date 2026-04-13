import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export enum OperationAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum OperationModule {
  PERMISSION = 'PERMISSION',
  ROLE = 'ROLE',
  USER = 'USER',
}

@Entity('operation_logs')
export class OperationLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '操作用户ID' })
  userId: number

  @Column({ length: 50, comment: '操作用户名' })
  username: string

  @Column({
    type: 'enum',
    enum: OperationAction,
    comment: '操作类型: 创建/更新/删除',
  })
  action: OperationAction

  @Column({
    type: 'enum',
    enum: OperationModule,
    comment: '操作模块: 权限/角色/用户',
  })
  module: OperationModule

  @Column({ comment: '操作目标资源ID' })
  targetId: number

  @Column({ type: 'json', nullable: true, comment: '修改前数据' })
  beforeData: any

  @Column({ type: 'json', nullable: true, comment: '修改后数据' })
  afterData: any

  @Column({ length: 50, nullable: true, comment: '操作IP地址' })
  ip: string

  @Column({ length: 500, nullable: true, comment: '浏览器User-Agent' })
  userAgent: string

  @CreateDateColumn({ comment: '操作时间' })
  createdAt: Date
}
