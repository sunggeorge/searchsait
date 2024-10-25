import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), 'public', 'res', '202430');
    const files = fs.readdirSync(directoryPath);
    
    // Filter JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    return NextResponse.json(jsonFiles);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to list files' }, { status: 500 });
  }
}