import { NextResponse } from 'next/server';
import data from '../../../../data/data.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const goal = data.goals.find(g => g.id === params.id);
  
  if (!goal) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
  }
  
  return NextResponse.json(goal);
}