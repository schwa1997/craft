import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

const todosPath = path.join(process.cwd(), 'data', 'todos.json');

async function readTodos(): Promise<Todo[]> {
  const data = await fs.readFile(todosPath, 'utf8');
  return JSON.parse(data);
}

// 提取 ID 参数的工具函数
function getIdFromRequestUrl(request: NextRequest): string {
  const urlParts = request.url.split('/');
  return urlParts[urlParts.length - 1]; // 最后一个就是 id
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const id = getIdFromRequestUrl(request);
    const todos = await readTodos();
    const newTodos = todos.filter(todo => todo.id !== id);

    if (newTodos.length === todos.length) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    await fs.writeFile(todosPath, JSON.stringify(newTodos, null, 2));
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const id = getIdFromRequestUrl(request);
    const todos = await readTodos();
    const updatedTodo: Todo = await request.json();

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    todos[index] = {
      ...todos[index],
      ...updatedTodo,
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
    return NextResponse.json(todos[index]);

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
