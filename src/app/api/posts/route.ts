import { NextResponse } from "next/server";
import postsData from "../../data/posts.json";

export async function GET() {
  return NextResponse.json(postsData);
}
