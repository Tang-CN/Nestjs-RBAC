# NestJS RBAC权限管理系统

基于NestJS + TypeORM + MySQL + Redis的RBAC（基于角色的访问控制）权限管理系统。

## 功能特性

- 🔐 用户认证与授权
- 👥 用户管理（CRUD）
- 🎭 角色管理（CRUD）
- 🔑 权限管理（CRUD）
- 🛡️ RBAC权限控制
- 📝 Swagger API文档
- 🔄 JWT Token认证
- 💾 Redis缓存支持

## 技术栈

- **框架**: NestJS
- **数据库**: MySQL
- **ORM**: TypeORM
- **缓存**: Redis
- **认证**: JWT + Passport
- **验证**: class-validator
- **文档**: Swagger

## 项目结构

```
src/
├── modules/
│   ├── auth/           # 认证模块
│   │   ├── guards/     # 守卫
│   │   ├── strategies/ # JWT策略
│   │   ├── decorators/ # 装饰器
│   │   └── dto/        # 数据传输对象
│   ├── user/           # 用户模块
│   ├── role/           # 角色模块
│   ├── permission/     # 权限模块
│   └── redis/          # Redis模块
├── database/
│   └── seeds/          # 数据库初始化种子
└── scripts/            # 脚本文件
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env` 文件并配置数据库连接：

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=rbac_system
DB_SYNCHRONIZE=true
DB_LOGGING=true

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Application Configuration
APP_PORT=3000
APP_ENV=development
```

### 3. 创建数据库

在MySQL中创建数据库：

```sql
CREATE DATABASE rbac_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 初始化数据库

运行数据库初始化脚本，创建初始的管理员用户、角色和权限：

```bash
npm run db:init
```

初始化完成后会创建：

- 管理员账号: `admin` / `admin123`
- 普通用户账号: `user` / `user123`
- 预设的权限和角色

### 5. 启动应用

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

### 6. 访问API文档

启动应用后，访问 http://localhost:3000/api 查看Swagger API文档。

## API接口

### 认证接口

- `POST /auth/login` - 用户登录
- `POST /auth/logout` - 用户退出
- `GET /auth/profile` - 获取当前用户信息
- `GET /auth/permissions` - 获取当前用户权限

### 用户管理

- `POST /users` - 创建用户
- `GET /users` - 获取所有用户
- `GET /users/:id` - 根据ID获取用户
- `PATCH /users/:id` - 更新用户
- `DELETE /users/:id` - 删除用户
- `PATCH /users/:id/roles` - 更新用户角色

### 角色管理

- `POST /roles` - 创建角色
- `GET /roles` - 获取所有角色
- `GET /roles/:id` - 根据ID获取角色
- `PATCH /roles/:id` - 更新角色
- `DELETE /roles/:id` - 删除角色
- `PATCH /roles/:id/permissions` - 更新角色权限

### 权限管理

- `POST /permissions` - 创建权限
- `GET /permissions` - 获取所有权限
- `GET /permissions/:id` - 根据ID获取权限
- `PATCH /permissions/:id` - 更新权限
- `DELETE /permissions/:id` - 删除权限

## 使用示例

### 1. 用户登录

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. 使用Token访问受保护接口

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 权限控制

系统使用RBAC（基于角色的访问控制）模型：

1. **用户** 拥有多个**角色**
2. **角色** 拥有多个**权限**
3. **权限** 定义了具体的操作（如：创建用户、查看用户等）

### 使用权限装饰器

在控制器中使用 `@Permissions()` 装饰器来要求特定权限：

```typescript
import { Permissions } from '../auth/decorators/permissions.decorator'

@Controller('users')
export class UserController {
  @Post()
  @Permissions('user:create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
```

### 使用权限守卫

在模块中使用 `RolesGuard` 来启用权限检查：

```typescript
import { RolesGuard } from '../auth/guards/roles.guard'

@Module({
  providers: [RolesGuard],
})
export class UserModule {}
```

## 数据库表结构

### users 表

- id: 主键
- username: 用户名
- email: 邮箱
- password: 密码（加密）
- nickname: 昵称
- avatar: 头像URL
- status: 状态
- isDeleted: 软删除标记
- createdAt: 创建时间
- updatedAt: 更新时间

### roles 表

- id: 主键
- name: 角色名称
- code: 角色编码
- description: 角色描述
- status: 状态
- isDeleted: 软删除标记
- createdAt: 创建时间
- updatedAt: 更新时间

### permissions 表

- id: 主键
- name: 权限名称
- code: 权限编码
- description: 权限描述
- resource: 资源路径
- action: 操作类型
- status: 状态
- isDeleted: 软删除标记
- createdAt: 创建时间
- updatedAt: 更新时间

### user_roles 表（多对多关系）

- user_id: 用户ID
- role_id: 角色ID

### role_permissions 表（多对多关系）

- role_id: 角色ID
- permission_id: 权限ID

## 开发说明

### 添加新的权限

1. 在权限表中添加新的权限记录
2. 为角色分配新权限
3. 在控制器中使用 `@Permissions()` 装饰器

### 自定义权限检查

可以创建自定义的权限检查逻辑，例如基于资源的所有权检查。

## 常见问题

### 1. 数据库连接失败

检查 `.env` 文件中的数据库配置是否正确，确保MySQL服务正在运行。

### 2. Redis连接失败

检查Redis服务是否正在运行，以及 `.env` 中的Redis配置是否正确。

### 3. JWT Token过期

Token默认7天过期，可以在 `.env` 中修改 `JWT_EXPIRES_IN` 配置。

## 许可证

MIT License
