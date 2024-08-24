import fs from 'fs';
import path from 'path';

const baseUrl = {
  superadmin: '/api/v1/superadmin',
  admin: '/api/v1/admin',
  customer: '/api/v1/customer',
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
  [`${baseUrl.admin}/order`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/order/main.json'), 'utf-8')),
  [`${baseUrl.admin}/order/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/order/detail.json'), 'utf-8')),
  [`${baseUrl.admin}/order/confirm`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/order/confirm.json'), 'utf-8')),
  [`${baseUrl.admin}/order/deliver`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/order/deliver.json'), 'utf-8')),
  [`${baseUrl.admin}/menu`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/menu/main.json'), 'utf-8')),
  [`${baseUrl.admin}/menu/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/admin/menu/detail.json'), 'utf-8')),
};

// Customer
const customer = {
  [`${baseUrl.customer}/auth/login`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/auth/login.json'), 'utf-8')),
  [`${baseUrl.customer}/auth/register`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/auth/register.json'), 'utf-8')),
  [`${baseUrl.customer}/menu`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/menu/main.json'), 'utf-8')),
  [`${baseUrl.customer}/menu/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/menu/detail.json'), 'utf-8')),
  [`${baseUrl.customer}/menu/basket`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/menu/basket.json'), 'utf-8')),
  [`${baseUrl.customer}/basket`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/basket/main.json'), 'utf-8')),
  [`${baseUrl.customer}/basket/{id}`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/basket/detail.json'), 'utf-8')),
  [`${baseUrl.customer}/basket/pay`]: JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/customer/basket/pay.json'), 'utf-8')),
};

// Gabungkan semua path untuk auth
const paths = {
  // Superadmin
  ...superadmin,
  // Admin
  ...admin,
  // Customer
  ...customer,
};

// Ekspor paths sebagai default
export default paths;
