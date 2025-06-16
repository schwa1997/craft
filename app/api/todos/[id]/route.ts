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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const todos = await readTodos();
    const updatedTodo: Todo = await request.json();
    
    const index = todos.findIndex(t => t.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const todos = await readTodos();
    const newTodos = todos.filter(todo => todo.id !== params.id);
    
    if (newTodos.length === todos.length) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    await fs.writeFile(todosPath, JSON.stringify(newTodos, null, 2));
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}