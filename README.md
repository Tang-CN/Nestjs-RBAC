# NestJS RBAC权限管理系统

基于NestJS + TypeORM + MySQL + Redis的RBAC（基于角色的访问控制）权限管理系统。企业级开箱即用的后台权限管理脚手架。

## 功能特性

- 🔐 用户认证与授权
- 👥 用户管理（CRUD）
- 🎭 角色管理（CRUD）
- 🔑 权限管理（CRUD）
- 🛡️ RBAC权限控制
- 📝 Swagger API文档
- 🔄 JWT Token认证
- 💾 Redis缓存支持
- 🚀 支持刷新Token
- ✨ 注解式缓存系统 (@Cache / @CacheEvict)
- 📋 操作日志审计系统
- ⚠️ 全局异常统一处理
- 📦 统一响应格式封装
- 🔍 接口参数自动校验
- 🗑️ 软删除支持

## 技术栈

- **框架**: NestJS
- **数据库**: MySQL
- **ORM**: TypeORM
- **缓存**: Redis
- **认证**: JWT + Passport
- **验证**: class-validator + class-transformer
- **文档**: Swagger
- **日志**: 内置操作日志审计

## 项目结构

```
src/
├── @types/                     # 全局类型定义
├── common/                     # 公共核心组件
│   ├── decorators/             # 自定义装饰器
│   │   ├── permissions.decorator.ts    # 权限注解
│   │   ├── cache.decorator.ts          # 缓存注解
│   │   ├── cache-evict.decorator.ts    # 缓存清除注解
│   │   └── operation-log.decorator.ts  # 操作日志注解
│   ├── interceptors/           # 全局拦截器
│   │   ├── cache.interceptor.ts        # 缓存自动拦截器
│   │   ├── cache-evict.interceptor.ts  # 缓存清除拦截器
│   │   ├── operation-log.interceptor.ts # 操作日志拦截器
│   │   └── transform.interceptor.ts    # 统一响应拦截器
│   ├── filters/                # 全局过滤器
│   │   └── all-exception.filter.ts      # 全局异常过滤器
│   └── exception/              # 自定义异常
├── modules/                    # 业务模块
│   ├── auth/                   # 认证模块
│   │   ├── guards/             # 权限守卫
│   │   └── strategies/         # JWT认证策略
│   ├── user/                   # 用户模块
│   ├── role/                   # 角色模块
│   ├── permission/             # 权限模块
│   └── operation-log/          # 操作日志模块
├── shared/                     # 共享模块
│   ├── redis.service.ts        # Redis服务
│   └── constants/              # 常量定义
└── app.module.ts               # 应用入口
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

## 核心高级特性

### ✨ 注解式缓存系统

本系统实现了业务零侵入的注解式缓存体系，无需编写重复的缓存代码。

#### @Cache - 缓存查询结果

```typescript
// 缓存角色列表，过期时间30分钟
@Get()
@Cache('roles:list', 1800)
findAll() {
  return this.roleService.findAll()
}

// 动态缓存key，自动替换参数
@Get(':id')
@Cache('role::id')
findOne(@Param('id') id: number) {
  return this.roleService.findOne(id)
}
```

#### @CacheEvict - 自动清除缓存

```typescript
// 修改数据时自动清除相关缓存
@Put(':id')
@CacheEvict('roles:list', 'role::id')
update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
  return this.roleService.update(id, updateRoleDto)
}

// 同时清除多个缓存，支持路径参数和Body参数自动替换
@Patch(':roleId/permissions')
@CacheEvict('roles:list', 'permission:list', 'role:permissions::roleId')
updatePermissions(@Param('roleId') roleId: number, @Body() permissionIds: number[]) {
  return this.roleService.updatePermissions(roleId, permissionIds)
}
```

> 💡 占位符规则：使用 `::参数名` 语法，自动从请求路径、Body中提取参数值，无需手动拼接key。

---

### 📋 操作日志审计系统

使用 `@OperationLog()` 注解自动记录用户操作日志，支持审计追溯：

```typescript
@Post()
@OperationLog('创建用户')
@Permissions('user:create')
create(@Body() createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto)
}
```

自动记录字段：

- ✅ 操作人、用户ID
- ✅ 请求IP地址
- ✅ 操作模块、操作描述
- ✅ 请求参数、返回结果
- ✅ 执行耗时、请求状态
- ✅ 异常信息（如果发生错误）

---

### 🛡️ 权限控制系统

系统采用标准RBAC三级权限模型：
`用户 → 角色 → 权限`

#### 权限注解使用

```typescript
// 要求单个权限
@Post()
@Permissions('user:create')
create() { ... }

// 要求多个权限（同时满足）
@Delete(':id')
@Permissions('user:delete', 'user:admin')
remove() { ... }
```

#### 权限守卫全局生效

所有接口默认需要登录，只有标记权限的接口会进行权限校验。

---

### ⚠️ 全局异常与统一响应

✅ 所有接口成功返回统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
}
```

✅ 所有接口失败返回统一格式：

```json
{
  "code": 400,
  "message": "error",
  "data": { ... },
}
```

✅ 业务异常抛出：

```typescript
throw new CustomException(USER_ERR.USER_PASSWORD_ERROR)
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

### operation_logs 表

- id: 主键
- userId: 操作人ID
- username: 操作人用户名
- ip: 请求IP
- module: 模块
- description: 操作描述
- params: 请求参数
- result: 返回结果
- duration: 执行耗时(ms)
- success: 是否成功
- errorMessage: 错误信息
- createdAt: 创建时间

## 开发说明

### 添加新的权限

1. 在权限表中添加新的权限记录
2. 为角色分配新权限
3. 在控制器中使用 `@Permissions()` 装饰器

### 缓存最佳实践

1. 查询接口使用 `@Cache()` 注解，设置合理过期时间
2. 新增/修改/删除接口使用 `@CacheEvict()` 清除相关缓存
3. 缓存key命名规范：`模块:属性:id`
4. 避免缓存过大的数据集

## 常见问题

### 1. 数据库连接失败

检查 `.env` 文件中的数据库配置是否正确，确保MySQL服务正在运行。

### 2. Redis连接失败

检查Redis服务是否正在运行，以及 `.env` 中的Redis配置是否正确。

### 3. JWT Token过期

Token默认7天过期，可以在 `.env` 中修改 `JWT_EXPIRES_IN` 配置。

### 4. 缓存不生效

检查Redis连接是否正常，以及方法是否被AOP代理（不要在类内部调用方法）。

## 许可证

MIT License
