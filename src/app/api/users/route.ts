import { NextRequest, NextResponse } from 'next/server';
import type { User, PaginatedResponse } from '@/types';

// 生成更多模拟用户数据
const generateMockUsers = (): User[] => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二',
    '陈明', '林华', '黄强', '刘洋', '杨帆', '徐亮', '朱军', '马超', '胡伟', '郭鹏',
    '何峰', '高磊', '罗勇', '梁杰', '宋涛', '唐超', '韩波', '冯凯', '董斌', '萧然',
    '程琳', '曹莹', '袁静', '邓雪', '许丽', '傅芳', '沈萍', '曾敏', '彭娟', '吕燕'];
  const roles: ('admin' | 'user')[] = ['admin', 'user', 'user', 'user', 'user'];
  
  return names.map((name, index) => ({
    id: String(index + 1),
    name,
    email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
    role: roles[index % roles.length],
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - index * 43200000).toISOString(),
  }));
};

const users = generateMockUsers();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let filteredUsers = users;

  if (role) {
    filteredUsers = users.filter((user) => user.role === role);
  }

  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const response: PaginatedResponse<User> = {
    success: true,
    data: paginatedUsers,
    total,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role = 'user' } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      role,
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
