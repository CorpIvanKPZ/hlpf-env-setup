import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1780269386169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Створення таблиці категорій
    await queryRunner.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        "createdAt" TIMESTAMP DEFAULT now()
      )
    `);

    // Створення таблиці продуктів
    await queryRunner.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        category_id INTEGER REFERENCES categories(id)
          ON DELETE SET NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Видалення у зворотному порядку
    await queryRunner.query('DROP TABLE IF EXISTS products');
    await queryRunner.query('DROP TABLE IF EXISTS categories');
  }
}