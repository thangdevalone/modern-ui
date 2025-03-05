import {getMarkdownContent} from "@/lib/markdown";
import {type NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  try {
    const content = await getMarkdownContent(slug);
    return NextResponse.json({content});
  } catch (error) {
    return NextResponse.json({error: "Content not found"}, {status: 404});
  }
}

