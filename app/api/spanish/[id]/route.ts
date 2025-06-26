import { NextResponse } from 'next/server';
import data from '../../../../data/spanish.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const verb = data.verbs.find(v => v.id === Number(params.id));
    
    if (!verb) {
      return NextResponse.json(
        { error: 'Verb not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(verb);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}