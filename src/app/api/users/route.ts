import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据
const users = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: '2', name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: '3', name: '王五', email: 'wangwu@example.com', role: 'user' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role');

  let filteredUsers = users;

  if (role) {
    filteredUsers = users.filter((user) => user.role === role);
  }

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    total: filteredUsers.length,
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
