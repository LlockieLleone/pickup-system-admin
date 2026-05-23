# Smart Childcare Management System - Admin Panel  
# 托管班管理系统 - Vue 管理后台

Vue-based admin management platform for childcare centers and after-school programs.

基于 Vue 的托管班管理后台系统，面向托管班与课后辅导机构场景。

---

# 📌 Overview ｜ 项目简介

This repository contains the web-based admin management platform of the system.

The admin panel is designed to support:

- Student management
- Attendance management
- Pickup record management
- Parent/teacher account management
- Role-based administration
- Backend API interaction

该仓库包含系统的 Web 管理后台部分。

当前后台主要用于支持：

- 学生信息管理
- 学生考勤管理
- 接送记录管理
- 家长 / 教师账号管理
- 基于角色的后台管理
- 后端接口交互

---

# ✅ Current Status ｜ 当前开发状态

## Completed ｜ 已完成

### Frontend Architecture
- Vue 3 project structure
- Vite build configuration
- Vue Router integration
- Axios request encapsulation
- Basic route management

### Business Features
- Login page
- JWT login integration
- Backend API communication
- Attendance management page
- Student management module
- Pickup management module

### Engineering
- Environment variable configuration
- Frontend-backend separation architecture
- Git version control integration

已完成内容：

### 前端基础架构
- Vue 3 项目结构
- Vite 构建配置
- Vue Router 路由集成
- Axios 请求封装
- 基础路由管理

### 业务功能
- 登录页面
- JWT 登录接入
- 后端 API 通信
- 考勤管理页面
- 学生管理模块
- 接送管理模块

### 工程化
- 环境变量配置
- 前后端分离架构
- Git 版本管理接入

---

# 🛠 Tech Stack ｜ 技术栈

## Frontend
- Vue 3
- Vite
- Vue Router
- Axios
- Pinia（if used）
- Element Plus（if used）

## Communication
- RESTful API
- JWT Authentication

---

# 🏗 System Architecture ｜ 系统架构

```text
Vue Admin Panel
        ↓
   RESTful API
        ↓
Spring Boot Backend
        ↓
      MySQL
```

Current repository scope:

- Vue admin panel only

Not included in this repository:

- Spring Boot backend service
- Android client

当前仓库仅包含：

- Vue 管理后台

暂未包含：

- Spring Boot 后端服务
- Android 客户端

---

# ✨ Main Features ｜ 当前功能

## Authentication ｜ 用户认证

- JWT login integration
- Login state validation
- Route permission interception

- JWT 登录接入
- 登录状态校验
- 路由权限拦截

---

## Student Management ｜ 学生管理

- Student information management
- Student record display
- Student status queries

- 学生信息管理
- 学生档案展示
- 学生状态查询

---

## Attendance Management ｜ 考勤管理

- Attendance record display
- Daily attendance queries
- Attendance status management

- 考勤记录展示
- 每日考勤查询
- 考勤状态管理

---

## Pickup Management ｜ 接送管理

- Pickup record display
- Pickup history queries
- Parent authorization information display

- 接送记录展示
- 接送历史查询
- 家长授权信息展示

---

# 🔒 Current Security Measures ｜ 当前安全措施

The current frontend includes:

- JWT token storage
- Route authentication checks
- API request token injection
- Environment variable separation

当前前端已包含：

- JWT Token 存储
- 路由登录校验
- API 请求 Token 注入
- 环境变量隔离

---

# 🚧 Future Improvements ｜ 后续开发方向

The project is still under active development.

Planned improvements include:

- Dynamic permission management
- Fine-grained route authorization
- Dashboard optimization
- Responsive mobile support
- Dark mode support
- Real-time attendance dashboard
- Notification center
- QR code pickup verification UI
- Docker deployment support
- CI/CD integration

项目目前仍在持续开发中。

后续计划包括：

- 动态权限管理
- 更细粒度的路由权限控制
- Dashboard 数据面板优化
- 移动端响应式支持
- 深色模式支持
- 实时考勤数据面板
- 消息通知中心
- 接送二维码验证界面
- Docker 部署支持
- CI/CD 自动化流程

---

# 🚀 Deployment ｜ 部署说明

## Environment Requirements ｜ 环境要求

- Node.js 18+
- npm / pnpm

---

## Run Locally ｜ 本地运行

```bash
git clone <repository-url>
cd admin-web

npm install
npm run dev
```

---

## Build ｜ 项目构建

```bash
npm run build
```

---

# ⚙ Configuration ｜ 配置说明

Please configure frontend environment variables locally.

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

请自行配置前端环境变量。

例如：

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

# 📂 Repository Scope ｜ 仓库范围说明

This repository currently contains only the Vue admin panel module.

Backend services and Android applications are maintained separately.

当前仓库仅包含 Vue 管理后台模块。

后端服务参考 https://github.com/LlockieLleone/pickup-system-service

---

# 👨‍💻 Author ｜ 作者

Lingjun Liao  
University of Ottawa  
Computer Engineering
