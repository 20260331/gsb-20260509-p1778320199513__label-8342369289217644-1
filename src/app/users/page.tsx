'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Loader2,
  UserX,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import type { User, PaginatedResponse } from '@/types';
import { formatDateTime, formatPaginationInfo, getUserRoleLabel } from '@/lib/utils';

const pageSizeOptions = [5, 10, 20, 50];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
      const data: PaginatedResponse<User> = await response.json();
      if (data.success) {
        const fetchedUsers = data.data || [];
        const fetchedTotal = data.pagination?.total || 0;
        const fetchedTotalPages = data.pagination?.totalPages || 0;

        if (fetchedTotal === 0) {
          setUsers([]);
          setTotal(0);
          setTotalPages(0);
        } else if (fetchedUsers.length === 0 && page > fetchedTotalPages) {
          setPage(fetchedTotalPages);
        } else {
          setUsers(fetchedUsers);
          setTotal(fetchedTotal);
          setTotalPages(fetchedTotalPages);
        }
      } else {
        setError(data.error || '获取用户列表失败');
      }
    } catch (err) {
      setError('网络请求失败，请检查网络连接后重试');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <UserX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">暂无用户数据</h3>
      <p className="mt-2 text-center text-muted-foreground">
        当前还没有任何用户记录
      </p>
    </motion.div>
  );

  const renderErrorState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">加载失败</h3>
      <p className="mt-2 text-center text-muted-foreground">{error}</p>
      <Button
        variant="default"
        size="sm"
        className="mt-6 gap-2"
        onClick={() => fetchUsers()}
      >
        <RefreshCw className="h-4 w-4" />
        重新加载
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">用户管理</span>
          </div>
          <nav className="flex items-center gap-4">
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
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">用户列表</h1>
          {!loading && !error && total > 0 && (
            <p className="mt-2 text-muted-foreground">
              {formatPaginationInfo(page, limit, total, totalPages)}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          renderErrorState()
        ) : total === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4"
            >
              {users.map((user) => (
                <motion.div key={user.id} variants={item}>
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-lg font-medium">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {getUserRoleLabel(user.role)}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        ID: {user.id}
                        {user.createdAt && ` · 创建时间：${formatDateTime(user.createdAt)}`}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">每页显示</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size} 条
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((pageNum, index) => (
                  <Button
                    key={index}
                    variant={pageNum === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                    disabled={pageNum === '...'}
                    className={pageNum === '...' ? 'cursor-default' : ''}
                  >
                    {pageNum}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
