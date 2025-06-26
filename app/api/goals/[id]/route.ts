import { NextRequest, NextResponse } from 'next/server';
import data from '../../../../data/goals.json';

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const goal = data.goals.find((g) => g.id === id);

  if (!goal) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
  }

  return NextResponse.json(goal);
}
