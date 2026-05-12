'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeToggle } from '@/components/theme-toggle';
import { ChevronLeft, ChevronRight, Code2, Users } from 'lucide-react';
import type { PaginatedResponse, User } from '@/types';

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [response, setResponse] = useState<PaginatedResponse<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchIdRef = useRef(0);

  const fetchUsers = useCallback(async () => {
    const currentId = ++fetchIdRef.current;
    setLoading(true);
    try {
      const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
      const data: PaginatedResponse<User> = await res.json();
      if (fetchIdRef.current === currentId) {
        setResponse(data);
      }
    } finally {
      if (fetchIdRef.current === currentId) {
        setLoading(false);
      }
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const pagination = response?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const users = response?.data ?? [];

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  const roleVariant = (role: User['role']) =>
    role === 'admin' ? 'default' : 'secondary';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
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
            <Button variant="ghost" size="sm" asChild>
              <a href="/">首页</a>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">用户列表</h1>
              <p className="text-sm text-muted-foreground">
                共 {pagination?.total ?? 0} 名用户
              </p>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">用户数据</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">每页</span>
                  <Select
                    value={String(limit)}
                    onValueChange={handleLimitChange}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">条</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  加载中...
                </div>
              ) : users.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  暂无数据
                </div>
              ) : (
                <>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-2"
                  >
                    {users.map((user) => (
                      <motion.div key={user.id} variants={item}>
                        <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                          <div className="flex items-center gap-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Badge variant={roleVariant(user.role)}>
                            {user.role === 'admin' ? '管理员' : '用户'}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      第 {(page - 1) * limit + 1}-
                      {Math.min(page * limit, pagination?.total ?? 0)} 条，共{' '}
                      {pagination?.total ?? 0} 条
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        上一页
                      </Button>
                      <div className="flex items-center gap-1">
                        {generatePageNumbers(page, totalPages).map((p, i) =>
                          p === '...' ? (
                            <span
                              key={`ellipsis-${i}`}
                              className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
                            >
                              …
                            </span>
                          ) : (
                            <Button
                              key={p}
                              variant={p === page ? 'default' : 'outline'}
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setPage(p as number)}
                            >
                              {p}
                            </Button>
                          )
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      >
                        下一页
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

function generatePageNumbers(
  current: number,
  total: number
): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
}
