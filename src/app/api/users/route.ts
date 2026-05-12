import { NextRequest, NextResponse } from 'next/server';

const users = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', role: 'admin' as const },
  { id: '2', name: '李四', email: 'lisi@example.com', role: 'user' as const },
  { id: '3', name: '王五', email: 'wangwu@example.com', role: 'user' as const },
  { id: '4', name: '赵六', email: 'zhaoliu@example.com', role: 'user' as const },
  { id: '5', name: '孙七', email: 'sunqi@example.com', role: 'admin' as const },
  { id: '6', name: '周八', email: 'zhouba@example.com', role: 'user' as const },
  { id: '7', name: '吴九', email: 'wujiu@example.com', role: 'user' as const },
  { id: '8', name: '郑十', email: 'zhengshi@example.com', role: 'user' as const },
  { id: '9', name: '陈明', email: 'chenming@example.com', role: 'admin' as const },
  { id: '10', name: '林芳', email: 'linfang@example.com', role: 'user' as const },
  { id: '11', name: '黄伟', email: 'huangwei@example.com', role: 'user' as const },
  { id: '12', name: '刘洋', email: 'liuyang@example.com', role: 'user' as const },
  { id: '13', name: '杨静', email: 'yangjing@example.com', role: 'admin' as const },
  { id: '14', name: '何磊', email: 'helei@example.com', role: 'user' as const },
  { id: '15', name: '马丽', email: 'mali@example.com', role: 'user' as const },
  { id: '16', name: '罗强', email: 'luoqiang@example.com', role: 'user' as const },
  { id: '17', name: '梁军', email: 'liangjun@example.com', role: 'user' as const },
  { id: '18', name: '宋琳', email: 'songlin@example.com', role: 'admin' as const },
  { id: '19', name: '唐华', email: 'tanghua@example.com', role: 'user' as const },
  { id: '20', name: '许峰', email: 'xufeng@example.com', role: 'user' as const },
  { id: '21', name: '韩雪', email: 'hanxue@example.com', role: 'user' as const },
  { id: '22', name: '冯刚', email: 'fenggang@example.com', role: 'user' as const },
  { id: '23', name: '邓萍', email: 'dengping@example.com', role: 'admin' as const },
  { id: '24', name: '曹勇', email: 'caoyong@example.com', role: 'user' as const },
  { id: '25', name: '彭涛', email: 'pengtao@example.com', role: 'user' as const },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role');
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(searchParams.get('limit')) || 10);

  let filteredUsers = users;

  if (role) {
    filteredUsers = users.filter((user) => user.role === role);
  }

  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedData = filteredUsers.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginatedData,
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
