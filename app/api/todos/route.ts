import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const todosPath = path.join(process.cwd(), 'data', 'todos.json');

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

// 辅助函数：读取todos
async function readTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(todosPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// 辅助函数：写入todos
async function writeTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
}

export async function GET() {
  const todos = await readTodos();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { text, completed } = await request.json();
  const todos = await readTodos();
  
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: completed || false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  await writeTodos(todos);
  
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedTodo = await request.json();
  const todos = await readTodos();
  
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  
  todos[index] = {
    ...todos[index],
    ...updatedTodo,
    updatedAt: new Date().toISOString()
  };
  
  await writeTodos(todos);
  return NextResponse.json(todos[index]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const todos = await readTodos();
  
  const filteredTodos = todos.filter(todo => todo.id !== id);
  if (filteredTodos.length === todos.length) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  
  await writeTodos(filteredTodos);
  return NextResponse.json({ success: true });
}