import { NextRequest, NextResponse } from 'next/server';
import type { User, UserRole } from '@/types';

const firstNames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐', '孙', '马', '朱', '胡'];
const lastNames = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '洋', '艳', '勇', '军', '杰', '娟', '涛'];
const roles: UserRole[] = ['admin', 'user', 'user', 'user', 'user'];

const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]}${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const users = generateMockUsers(87);

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

  return NextResponse.json({
    success: true,
    data: paginatedUsers,
    total,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
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

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
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
