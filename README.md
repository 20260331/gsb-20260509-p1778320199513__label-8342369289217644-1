# Modern Fullstack App

基于 Next.js 14、TypeScript、Tailwind CSS 和 shadcn/ui 构建的现代全栈应用模板。

## 技术栈

- **前端框架**: React + Next.js 14 (App Router)
- **样式与UI**: Tailwind CSS + shadcn/ui (基于 Radix UI)
- **动画**: Framer Motion
- **语言**: TypeScript
- **代码规范**: ESLint + Prettier

## 项目结构

```
78/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API Routes
│   │   │   ├── health/       # 健康检查接口
│   │   │   └── users/        # 用户接口
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 根布局
│   │   └── page.tsx          # 首页
│   ├── components/           # React 组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/                # 自定义 Hooks
│   ├── lib/                  # 工具函数
│   └── types/                # TypeScript 类型定义
├── public/                   # 静态资源
├── Dockerfile               # 生产环境 Docker 配置
├── Dockerfile.dev           # 开发环境 Docker 配置
├── docker-compose.yml       # Docker Compose 配置
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── .eslintrc.json           # ESLint 配置
├── .prettierrc              # Prettier 配置
└── package.json             # 项目依赖
```

## 快速开始

### 使用 Docker（推荐）

**生产模式**：
```bash
# 构建并启动
docker compose up -d

# 查看日志
docker compose logs -f
```

**开发模式**：
```bash
# 使用开发配置启动（支持热更新）
docker compose --profile dev up dev
```

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 端口说明

| 服务 | 端口 | 说明 |
|------|------|------|
| 前端/后端 | 3000 | Next.js 全栈应用 |

## API 接口

### 健康检查
- `GET /api/health` - 返回应用健康状态

### 用户管理
- `GET /api/users` - 获取用户列表
- `GET /api/users?role=admin` - 按角色筛选用户
- `POST /api/users` - 创建新用户

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 问题 |
| `npm run format` | 使用 Prettier 格式化代码 |
| `npm run format:check` | 检查代码格式 |
| `npm run type-check` | TypeScript 类型检查 |

## 环境变量

复制 `.env.example` 为 `.env.local` 并配置相应变量：

```bash
cp .env.example .env.local
```

## 添加 shadcn/ui 组件

项目已配置 shadcn/ui，可直接添加组件：

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

## 功能特性

- 响应式设计，适配移动端
- 深色/浅色主题切换
- 现代化 UI 组件库
- 类型安全的 API 路由
- Docker 一键部署
- 代码规范自动化

## 许可证

MIT
