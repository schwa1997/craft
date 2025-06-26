import { NextResponse } from "next/server";
import data from "../../../data/goals.json";


export async function GET() {
  try {
    // Type assertion for imported JSON data
    const goalsData = data as GoalsData;

    // Validate data structure
    if (!goalsData?.goals || !Array.isArray(goalsData.goals)) {
      throw new Error("Invalid data structure in goals.json");
    }

    // Extract and transform the data with additional validation
    const goalList = goalsData.goals.map((goal) => {
      // Basic validation for required fields
      if (!goal.id || !goal.title) {
        console.warn(`Goal with missing required fields: ${JSON.stringify(goal)}`);
      }

      return {
        id: goal.id,
        title: goal.title,
        description: goal.description || "", // Ensure description exists
        // Include additional fields if they exist
        // ...(goal.progress !== undefined && { progress: goal.progress }),
        // ...(goal.lastUpdated && { lastUpdated: goal.lastUpdated }),
        ...(goal.feeling !== undefined && { feeling: goal.feeling }),
      };
    }).filter(goal => goal.id && goal.title); // Filter out invalid entries

    // Add caching headers (adjust as needed)
    const headers = {
      'Cache-Control': 'public, max-age=3600', // 1 hour cache
    };

    return NextResponse.json(goalList, { headers });
  } catch (error) {
    console.error('Error in GET /api/goals:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch goals list",
        ...(error instanceof Error && { details: error.message }) 
      },
      { status: 500 }
    );
  }
}