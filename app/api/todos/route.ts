import { NextResponse } from 'next/server';
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

export async function GET(): Promise<NextResponse> {
  try {
    const todos = await readTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const todos = await readTodos();
    const { text, completed = false } = await request.json();
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
    return NextResponse.json(newTodo, { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}