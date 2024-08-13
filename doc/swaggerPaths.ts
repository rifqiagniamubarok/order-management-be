import fs from 'fs';
import path from 'path';

// Load individual JSON files
const registerDoc = JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/register.json'), 'utf-8'));

// Gabungkan semua path untuk auth
const paths = {
  '/v1/api/auth/register': registerDoc,
};

// Ekspor paths sebagai default
export default paths;
