'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserList } from '@/components/user-list';
import { ArrowRight, Code2, Layers, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'TypeScript 优先',
    description: '完整的类型安全，提供更好的开发体验和代码质量',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'shadcn/ui 组件',
    description: '基于 Radix UI 的可访问性组件，美观且功能强大',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Framer Motion',
    description: '流畅的动画效果，提升用户交互体验',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Next.js 14',
    description: 'App Router、Server Components 等最新特性',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">Modern Stack</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              文档
            </Button>
            <Button variant="ghost" size="sm">
              组件
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <Badge variant="secondary" className="mb-4">
            全栈开发模板
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            现代化
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              {' '}
              全栈开发{' '}
            </span>
            起始模板
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            基于 Next.js 14、TypeScript、Tailwind CSS 和 shadcn/ui
            构建的现代全栈应用模板，开箱即用的开发体验
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              快速开始 <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              查看文档
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-12"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">准备好开始了吗？</h2>
          <p className="mt-4 text-primary-foreground/80">
            使用 Docker 一键启动，快速开始您的开发之旅
          </p>
          <div className="mt-6">
            <Button size="lg" variant="secondary" className="gap-2">
              <Code2 className="h-4 w-4" />
              docker-compose up -d
            </Button>
          </div>
        </motion.div>
      </section>

      {/* User List Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">
              数据管理
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              用户管理
            </h2>
            <p className="mt-4 text-muted-foreground">
              支持分页浏览，轻松管理大量用户数据
            </p>
          </div>
          <UserList />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Modern Fullstack App. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              GitHub
            </Button>
            <Button variant="ghost" size="sm">
              文档
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
