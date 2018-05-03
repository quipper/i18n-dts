import { readFileSync } from 'fs';

export const readFile = (filePath: string): string =>
  readFileSync(filePath, 'utf8').trim();
