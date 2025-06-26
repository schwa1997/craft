import { NextResponse } from 'next/server';
import data from '../../../data/spanish.json';


export async function GET() {
  try {
    // Extract just the essential data for the list view
    const verbList = data.verbs.map(verb => ({
      id: verb.id,
      infinitive: verb.infinitive,
      translation: verb.translation
    }));

    return NextResponse.json(verbList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch verbs list' },
      { status: 500 }
    );
  }
}