import sql from "../utils/sql.js";

export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM prompts 
      ORDER BY created_at DESC 
      LIMIT 50
    `;
    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return Response.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { content, source_type, source_url } = await request.json();

    if (!content || !source_type) {
      return Response.json(
        { error: "Content and source_type are required" },
        { status: 400 },
      );
    }

    const [row] = await sql`
      INSERT INTO prompts (content, source_type, source_url)
      VALUES (${content}, ${source_type}, ${source_url})
      RETURNING *
    `;

    return Response.json(row);
  } catch (error) {
    console.error("Error creating prompt:", error);
    return Response.json({ error: "Failed to create prompt" }, { status: 500 });
  }
}
