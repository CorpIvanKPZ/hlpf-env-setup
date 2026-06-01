import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'nestuser',
  password: process.env.POSTGRES_PASSWORD || 'nestpassword',
  database: process.env.POSTGRES_DB || 'nestdb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});

async function seed() {
  await ds.initialize();

  // Категорії
  const cats = ['Electronics', 'Accessories', 'Clothing'];
  for (const name of cats) {
    await ds.query(`INSERT INTO categories (name) VALUES ($1) ON CONFLICT DO NOTHING`, [name]);
  }

  // Продукти
  const products = [
    { name: 'iPhone 16', price: 999, stock: 50, cat: 1 },
    { name: 'Galaxy S24', price: 849, stock: 40, cat: 1 },
    { name: 'MacBook Pro', price: 2499, stock: 15, cat: 1 },
    { name: 'iPad Air', price: 599, stock: 30, cat: 1 },
    { name: 'AirPods Pro', price: 249, stock: 100, cat: 2 },
    { name: 'USB-C Cable', price: 19, stock: 500, cat: 2 },
    { name: 'MagSafe Charger', price: 39, stock: 80, cat: 2 },
    { name: 'Laptop Sleeve', price: 49, stock: 60, cat: 2 },
    { name: 'T-Shirt Dev', price: 25, stock: 200, cat: 3 },
    { name: 'Hoodie NestJS', price: 55, stock: 75, cat: 3 },
  ];

  for (let i = 0; i < 3; i++) {
    for (const p of products) {
      // Додай цей рядок:
      const suffix = i > 0 ? ` v${i + 1}` : ''; 
      
      await ds.query(
  `INSERT INTO products (name, price, stock, category_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
  [`${p.name}${suffix}`, p.price + i * 10, p.stock, p.cat],
);}
  }

  console.log('Seed complete: 30 products added.');
  await ds.destroy();
}

seed().catch(console.error);