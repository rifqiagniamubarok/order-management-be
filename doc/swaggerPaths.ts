import fs from 'fs';
import path from 'path';

const baseUrl = {
  superadmin: '/v1/api/superadmin',
  admin: '/v1/api/admin',
};

// Superadmin
const superadmin = {
  [`${baseUrl.superadmin}/auth/login`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/auth/login.json'), 'utf-8')),
  [`${baseUrl.superadmin}/admin`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/admin/main.json'), 'utf-8')),
  [`${baseUrl.superadmin}/admin/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/admin/detail.json'), 'utf-8')),
  [`${baseUrl.superadmin}/status`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/admin/status.json'), 'utf-8')),
  [`${baseUrl.superadmin}/table`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/table/main.json'), 'utf-8')),
  [`${baseUrl.superadmin}/table/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/table/detail.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/main.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/detail.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu/option`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/option.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu/option/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/optionDetail.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu/option/item`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/optionItem.json'), 'utf-8')),
  [`${baseUrl.superadmin}/menu/option/item/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/menu/optionItemDetail.json'), 'utf-8')),
};

// Admin
const admin = {
  [`${baseUrl.admin}/auth/login`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/auth/login.json'), 'utf-8')),
};

const saLogin = JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/login.json'), 'utf-8'));
const superadminLogin = JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/superadmin/login.json'), 'utf-8'));

// Gabungkan semua path untuk auth
const paths = {
  // Superadmin
  ...superadmin,
  // Admin
  ...admin,
};

// Ekspor paths sebagai default
export default paths;
