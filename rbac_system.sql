/*
 Navicat Premium Data Transfer

 Source Server         : bendi
 Source Server Type    : MySQL
 Source Server Version : 50726 (5.7.26)
 Source Host           : localhost:3306
 Source Schema         : rbac_system

 Target Server Type    : MySQL
 Target Server Version : 50726 (5.7.26)
 File Encoding         : 65001

 Date: 13/04/2026 16:25:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for operation_logs
-- ----------------------------
DROP TABLE IF EXISTS `operation_logs`;
CREATE TABLE `operation_logs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '操作用户ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作用户名',
  `action` enum('CREATE','UPDATE','DELETE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作类型: 创建/更新/删除',
  `module` enum('PERMISSION','ROLE','USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作模块: 权限/角色/用户',
  `targetId` int(11) NOT NULL COMMENT '操作目标资源ID',
  `beforeData` json NULL COMMENT '修改前数据',
  `afterData` json NULL COMMENT '修改后数据',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '操作IP地址',
  `userAgent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '浏览器User-Agent',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operation_logs
-- ----------------------------
INSERT INTO `operation_logs` VALUES (10, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 15:34:42.707158');
INSERT INTO `operation_logs` VALUES (11, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 1, \"code\": \"user:list\", \"name\": \"查看用户列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"user\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看用户列表的权限\"}, {\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 15:41:38.019314');
INSERT INTO `operation_logs` VALUES (12, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 1, \"code\": \"user:list\", \"name\": \"查看用户列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"user\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看用户列表的权限\"}, {\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 15:47:05.874423');
INSERT INTO `operation_logs` VALUES (13, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 15:51:09.513850');
INSERT INTO `operation_logs` VALUES (14, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 1, \"code\": \"user:list\", \"name\": \"查看用户列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"user\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看用户列表的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 15:54:08.820840');
INSERT INTO `operation_logs` VALUES (15, 1, 'admin', 'UPDATE', 'ROLE', 5, '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 1, \"code\": \"user:list\", \"name\": \"查看用户列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"user\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看用户列表的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '{\"id\": 5, \"code\": \"guest\", \"name\": \"访客\", \"isActive\": true, \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"访客，只有查看权限\", \"permissions\": [{\"id\": 1, \"code\": \"user:list\", \"name\": \"查看用户列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"user\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看用户列表的权限\"}, {\"id\": 6, \"code\": \"role:list\", \"name\": \"查看角色列表\", \"action\": \"list\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色列表的权限\"}, {\"id\": 10, \"code\": \"role:detail\", \"name\": \"查看角色详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"role\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看角色详情的权限\"}, {\"id\": 15, \"code\": \"permission:detail\", \"name\": \"查看权限详情\", \"action\": \"detail\", \"isActive\": true, \"resource\": \"permission\", \"createdAt\": \"2026-03-27T03:35:35.000Z\", \"isDeleted\": 0, \"updatedAt\": \"2026-03-27T03:35:35.000Z\", \"description\": \"查看权限详情的权限\"}]}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 16:04:16.950882');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_48ce552495d14eae9b187bb671`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_8dad765629e83229da6feda1c1`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (1, '查看用户列表', 'user:list', '查看用户列表的权限', 'user', 'list', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (2, '创建用户', 'user:create', '创建用户的权限', 'user', 'create', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (3, '编辑用户', 'user:update', '编辑用户的权限', 'user', 'update', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (4, '删除用户', 'user:delete', '删除用户的权限', 'user', 'delete', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (5, '查看用户详情', 'user:detail', '查看用户详情的权限', 'user', 'detail', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (6, '查看角色列表', 'role:list', '查看角色列表的权限', 'role', 'list', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (7, '创建角色', 'role:create', '创建角色的权限', 'role', 'create', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (8, '编辑角色', 'role:update', '编辑角色的权限', 'role', 'update', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (9, '删除角色', 'role:delete', '删除角色的权限', 'role', 'delete', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (10, '查看角色详情', 'role:detail', '查看角色详情的权限', 'role', 'detail', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (11, '查看权限列表', 'permission:list', '查看权限列表的权限', 'permission', 'list', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (12, '创建权限', 'permission:create', '创建权限的权限', 'permission', 'create', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (13, '编辑权限', 'permission:update', '编辑权限的权限', 'permission', 'update', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (14, '删除权限', 'permission:delete', '删除权限的权限', 'permission', 'delete', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `permissions` VALUES (15, '查看权限详情', 'permission:detail', '查看权限详情的权限', 'permission', 'detail', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions`  (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`) USING BTREE,
  INDEX `IDX_178199805b901ccd220ab7740e`(`role_id`) USING BTREE,
  INDEX `IDX_17022daf3f885f7d35423e9971`(`permission_id`) USING BTREE,
  CONSTRAINT `FK_17022daf3f885f7d35423e9971e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_178199805b901ccd220ab7740ec` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO `role_permissions` VALUES (1, 1);
INSERT INTO `role_permissions` VALUES (1, 2);
INSERT INTO `role_permissions` VALUES (1, 3);
INSERT INTO `role_permissions` VALUES (1, 4);
INSERT INTO `role_permissions` VALUES (1, 5);
INSERT INTO `role_permissions` VALUES (1, 6);
INSERT INTO `role_permissions` VALUES (1, 7);
INSERT INTO `role_permissions` VALUES (1, 8);
INSERT INTO `role_permissions` VALUES (1, 9);
INSERT INTO `role_permissions` VALUES (1, 10);
INSERT INTO `role_permissions` VALUES (1, 11);
INSERT INTO `role_permissions` VALUES (1, 12);
INSERT INTO `role_permissions` VALUES (1, 13);
INSERT INTO `role_permissions` VALUES (1, 14);
INSERT INTO `role_permissions` VALUES (1, 15);
INSERT INTO `role_permissions` VALUES (2, 1);
INSERT INTO `role_permissions` VALUES (2, 2);
INSERT INTO `role_permissions` VALUES (2, 3);
INSERT INTO `role_permissions` VALUES (2, 4);
INSERT INTO `role_permissions` VALUES (2, 5);
INSERT INTO `role_permissions` VALUES (2, 10);
INSERT INTO `role_permissions` VALUES (2, 11);
INSERT INTO `role_permissions` VALUES (2, 15);
INSERT INTO `role_permissions` VALUES (3, 5);
INSERT INTO `role_permissions` VALUES (3, 6);
INSERT INTO `role_permissions` VALUES (3, 10);
INSERT INTO `role_permissions` VALUES (3, 15);
INSERT INTO `role_permissions` VALUES (4, 1);
INSERT INTO `role_permissions` VALUES (4, 5);
INSERT INTO `role_permissions` VALUES (4, 10);
INSERT INTO `role_permissions` VALUES (5, 1);
INSERT INTO `role_permissions` VALUES (5, 6);
INSERT INTO `role_permissions` VALUES (5, 10);
INSERT INTO `role_permissions` VALUES (5, 15);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_f6d54f95c31b73fb1bdd8e91d0`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 'super_admin', '系统超级管理员，拥有所有权限', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `roles` VALUES (2, '管理员', 'admin', '系统管理员，拥有大部分管理权限', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `roles` VALUES (3, '普通用户', 'user', '普通用户，只有基本查看权限', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `roles` VALUES (4, '运营人员', 'operator', '运营人员，拥有内容管理权限', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');
INSERT INTO `roles` VALUES (5, '访客', 'guest', '访客，只有查看权限', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 11:35:35.000000');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `IDX_87b8888186ca9769c960e92687`(`user_id`) USING BTREE,
  INDEX `IDX_b23c65e50a758245a33ee35fda`(`role_id`) USING BTREE,
  CONSTRAINT `FK_87b8888186ca9769c960e926870` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b23c65e50a758245a33ee35fda1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (1, 1);
INSERT INTO `user_roles` VALUES (2, 2);
INSERT INTO `user_roles` VALUES (3, 3);
INSERT INTO `user_roles` VALUES (4, 4);
INSERT INTO `user_roles` VALUES (5, 3);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71`(`username`) USING BTREE,
  UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '2097658371@qq.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '超级管理员', 'https://avatars.githubusercontent.com/u/1?v=4', 1, 0, '2026-03-27 13:53:36.234385', '2026-03-27 13:56:07.162062');
INSERT INTO `users` VALUES (2, 'zhangsan', 'zhangsan@example.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '张三', 'https://avatars.githubusercontent.com/u/2?v=4', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-30 15:50:38.225115');
INSERT INTO `users` VALUES (3, 'lisi', 'lisi@example.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '李四', 'https://avatars.githubusercontent.com/u/3?v=4', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-30 15:50:40.798801');
INSERT INTO `users` VALUES (4, 'wangwu', 'wangwu@example.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '王五', 'https://avatars.githubusercontent.com/u/4?v=4', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-30 15:50:43.202965');
INSERT INTO `users` VALUES (5, 'zhaoliu', 'zhaoliu@example.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '赵六', 'https://avatars.githubusercontent.com/u/5?v=4', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-30 15:50:45.283415');
INSERT INTO `users` VALUES (6, 'guest', 'guest@example.com', '$2b$10$75/m3ipQgdfQlqB.SLxhpOnt2.vN.vd6I.yit6DPrE8EnG2XrUUS.', '访客用户', 'https://avatars.githubusercontent.com/u/6?v=4', 1, 0, '2026-03-27 11:35:35.000000', '2026-03-27 14:37:26.125232');

SET FOREIGN_KEY_CHECKS = 1;
