# 开发思考轨迹日志

## 项目概述

**任务**: 基于指定技术栈生成一个现代全栈项目的完整结构
**目录**: `/78`
**时间**: 2026-01-21

---

## 技术栈需求分析

| 需求 | 技术选型 | 说明 |
|------|----------|------|
| 前端框架 | React + Next.js 14 | 使用 App Router 架构 |
| 样式与UI | Tailwind CSS + shadcn/ui | 基于 Radix UI 的组件库 |
| 动画 | Framer Motion | 声明式动画库 |
| 后端 | Next.js API Routes | 全栈一体化方案 |
| 语言 | TypeScript | 类型安全 |
| 代码规范 | ESLint + Prettier | 自动化代码质量 |
| 部署 | Docker | 零依赖交付 |

---

## 开发步骤轨迹

### 第一阶段：项目基础配置

#### 1.1 创建项目目录
```
mkdir -p /Users/syefeng/Desktop/works-6849/78
```
**思考**: 根据用户要求，在当前目录下创建名为 `78` 的文件夹。

#### 1.2 初始化 package.json
**思考**:
- 需要包含所有必要的依赖项
- React 18 + Next.js 14 作为核心
- shadcn/ui 需要 Radix UI 系列组件、class-variance-authority、clsx、tailwind-merge
- Framer Motion 用于动画
- lucide-react 提供图标
- 开发依赖包括 TypeScript、ESLint、Prettier 及其插件

**关键依赖**:
```json
{
  "dependencies": {
    "@radix-ui/react-*": "各种 Radix 组件",
    "class-variance-authority": "组件变体管理",
    "clsx": "条件类名",
    "framer-motion": "动画",
    "lucide-react": "图标",
    "next": "14.2.21",
    "next-themes": "主题切换",
    "tailwind-merge": "Tailwind 类名合并"
  }
}
```

#### 1.3 TypeScript 配置 (tsconfig.json)
**思考**:
- 启用严格模式 (`strict: true`)
- 配置路径别名 `@/*` 指向 `./src/*`
- 支持 Next.js 插件
- 目标 ES2017 以支持 async/await

### 第二阶段：Next.js 配置

#### 2.1 next.config.mjs
**思考**:
- 启用 `output: 'standalone'` 用于 Docker 部署优化
- 启用 React 严格模式
- 启用实验性的 typedRoutes 提升类型安全

#### 2.2 next-env.d.ts
**思考**: Next.js 必需的类型声明文件，不应手动编辑。

### 第三阶段：Tailwind CSS 配置

#### 3.1 tailwind.config.ts
**思考**:
- 启用 `darkMode: ['class']` 支持主题切换
- 配置 shadcn/ui 所需的 CSS 变量色彩系统
- 扩展 borderRadius 使用 CSS 变量
- 添加 tailwindcss-animate 插件用于动画
- 配置容器居中和响应式断点

**色彩系统设计**:
```typescript
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: { DEFAULT, foreground },
  secondary: { DEFAULT, foreground },
  // ... 更多语义化颜色
}
```

#### 3.2 postcss.config.mjs
**思考**: 标准 PostCSS 配置，包含 tailwindcss 和 autoprefixer。

### 第四阶段：代码规范配置

#### 4.1 ESLint 配置 (.eslintrc.json)
**思考**:
- 继承 Next.js 核心规则
- 添加 TypeScript 和 React Hooks 规则
- 关闭 `react-in-jsx-scope`（Next.js 不需要）
- 配置未使用变量允许 `_` 前缀
- 添加 prettier 集成

#### 4.2 Prettier 配置 (.prettierrc)
**思考**:
- 使用单引号
- 行尾逗号 es5 风格
- 集成 tailwindcss 插件自动排序类名
- 80 字符行宽

### 第五阶段：shadcn/ui 配置

#### 5.1 components.json
**思考**: shadcn/ui CLI 配置文件，定义：
- 组件样式：default
- 支持 RSC
- TypeScript
- 路径别名配置

### 第六阶段：目录结构创建

```bash
mkdir -p src/{app,components/ui,lib,hooks,types,api}
```

**思考**: 遵循 Next.js 14 App Router 最佳实践：
- `app/` - 页面和路由
- `components/ui/` - shadcn/ui 组件
- `lib/` - 工具函数
- `hooks/` - 自定义 Hooks
- `types/` - TypeScript 类型定义

### 第七阶段：核心工具函数

#### 7.1 src/lib/utils.ts
**思考**:
- `cn()` 函数：合并 clsx 和 tailwind-merge，shadcn/ui 核心工具
- `formatDate()`: 日期格式化
- `sleep()`: 异步延迟
- `debounce()`: 防抖函数

### 第八阶段：全局样式

#### 8.1 src/app/globals.css
**思考**:
- 引入 Tailwind 三层
- 定义 CSS 变量实现主题系统
- 浅色和深色模式变量
- 自定义动画关键帧

**主题变量设计**:
```css
:root {
  --background: 0 0% 100%;      /* 白色背景 */
  --foreground: 222.2 84% 4.9%; /* 深色文字 */
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%; /* 深色背景 */
  --foreground: 210 40% 98%;    /* 浅色文字 */
  /* ... */
}
```

### 第九阶段：布局和页面

#### 9.1 src/app/layout.tsx
**思考**:
- 使用 Inter 字体
- 包裹 ThemeProvider 支持主题切换
- 集成 Toaster 组件
- 添加 suppressHydrationWarning 避免主题闪烁

#### 9.2 src/app/page.tsx
**思考**:
- 使用 `'use client'` 启用客户端交互
- Framer Motion 实现入场动画
- 响应式布局（移动端适配）
- 功能特性卡片展示
- CTA 区域引导用户

**动画设计**:
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

### 第十阶段：UI 组件

#### 10.1 Button 组件
**思考**: 使用 CVA (class-variance-authority) 管理变体：
- 6 种 variant: default, destructive, outline, secondary, ghost, link
- 4 种 size: default, sm, lg, icon
- 支持 asChild 使用 Radix Slot

#### 10.2 Card 组件
**思考**: 组合模式设计：
- Card (容器)
- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

#### 10.3 其他组件
- Badge: 标签/徽章
- Input: 表单输入
- Label: 表单标签
- Toast/Toaster: 消息提示

### 第十一阶段：主题系统

#### 11.1 ThemeProvider
**思考**: 封装 next-themes 的 ThemeProvider。

#### 11.2 ThemeToggle
**思考**:
- 使用 Sun/Moon 图标
- 点击切换 light/dark
- 图标旋转动画过渡

### 第十二阶段：API 路由

#### 12.1 /api/health
**思考**: 健康检查接口，返回：
- status: 服务状态
- timestamp: 时间戳
- uptime: 运行时间
- version: 版本号

#### 12.2 /api/users
**思考**:
- GET: 获取用户列表，支持 role 筛选
- POST: 创建用户，包含参数验证和错误处理

**错误处理设计**:
```typescript
if (!name || !email) {
  return NextResponse.json(
    { success: false, error: 'Name and email are required' },
    { status: 400 }
  );
}
```

### 第十三阶段：Docker 配置

#### 13.1 Dockerfile (生产)
**思考**: 多阶段构建优化镜像大小：
1. **deps 阶段**: 安装依赖
2. **builder 阶段**: 构建应用
3. **runner 阶段**: 运行时（仅复制必要文件）

**安全考虑**:
- 创建非 root 用户 (nextjs:nodejs)
- 使用 standalone 输出减小镜像

#### 13.2 Dockerfile.dev (开发)
**思考**: 支持热更新的开发镜像。

#### 13.3 docker-compose.yml
**思考**:
- 生产服务 (app): 端口 3000，健康检查
- 开发服务 (dev): 使用 profiles 按需启动，挂载卷支持热更新

### 第十四阶段：其他配置文件

- `.gitignore`: Git 忽略文件
- `.dockerignore`: Docker 构建忽略
- `.env.example`: 环境变量示例
- `README.md`: 项目文档

---

## 关键设计决策

### 1. 为什么选择 App Router？
- Next.js 14 推荐架构
- 更好的性能（Server Components）
- 更直观的文件系统路由
- 内置布局支持

### 2. 为什么使用 CSS 变量实现主题？
- 运行时可切换
- 无需重新编译
- 性能优秀
- shadcn/ui 官方推荐

### 3. 为什么多阶段 Docker 构建？
- 生产镜像更小
- 不包含开发依赖
- 安全性更高

### 4. 为什么使用 standalone 输出？
- 自包含部署
- 不依赖 node_modules
- Docker 镜像更小

---

## 交付检查清单

- [x] React + Next.js 14
- [x] Tailwind CSS + shadcn/ui
- [x] Framer Motion 动画
- [x] TypeScript 全覆盖
- [x] ESLint + Prettier
- [x] Next.js API Routes
- [x] Docker 配置
- [x] 端口 3000 映射
- [x] 零依赖原则
- [x] 错误处理逻辑
- [x] 响应式设计
- [x] 深色/浅色主题

---

## 启动命令

```bash
# Docker 启动（推荐）
cd 78
docker-compose build
docker-compose up -d
docker-compose logs -f

# 访问
http://localhost:3000
http://localhost:3000/api/health
http://localhost:3000/api/users
```
