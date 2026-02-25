import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { imageData, filename } = await req.json();
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const dir = join(process.cwd(), 'public', 'images');
    await mkdir(dir, { recursive: true });
    const filePath = join(dir, filename || 'powerbi-dashboard.png');
    await writeFile(filePath, buffer);
    return NextResponse.json({ success: true, path: `/images/${filename || 'powerbi-dashboard.png'}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
