import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const componentName = url.searchParams.get('name');
  
  if (!componentName) {
    return NextResponse.json(
      { error: 'Component name is required' },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), 'src', 'components', 'modern-ui', `${componentName}.tsx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return NextResponse.json(
      { error: 'Failed to load component code' },
      { status: 404 }
    );
  }
} 