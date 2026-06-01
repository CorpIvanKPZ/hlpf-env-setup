# Практична робота: Розробка REST API на NestJS

## Практичне заняття №3 — CRUD REST API для MiniShop
 
### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── [timestamp]-AddIsActiveToProducts.ts
│   ├── data-source.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```
 
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```
 
### API Endpoints
| Method | URL | Опис |
|--------|-----|------|
| GET | /api/categories | Список категорій |
| GET | /api/categories/:id | Одна категорія |
| POST | /api/categories | Створити категорію |
| PATCH | /api/categories/:id | Оновити категорію |
| DELETE | /api/categories/:id | Видалити категорію |
| GET | /api/products | Список продуктів |
| GET | /api/products/:id | Один продукт |
| POST | /api/products | Створити продукт |
| PATCH | /api/products/:id | Оновити продукт |
| DELETE | /api/products/:id | Видалити продукт |
 
### Перевірка міграцій
```text
           List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | categories | table | nestuser
 public | migrations | table | nestuser
 public | products   | table | nestuser
(3 rows)
```
 
### Тест створення категорії
```text
StatusCode: 201
Content: {"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-05-31T23:56:20.332Z"}
```
 
### Тест створення продукту
```text
StatusCode: 201
Content: {"id":1,"name":"iPhone 15","price":999.99,"stock":50,"category":{"id":1}}
```
 
### Тест отримання продуктів
```text
StatusCode: 200
Content: [{"id":1,"name":"iPhone 15","price":"999.99","stock":50,"category":{"id":1,"name":"Electronics"}}, {"id":2,"name":"USB Cable","price":"9.99","stock":200,"category":null}]
```
 
### Тест 404
```text
{"message":"Product #999 not found","error":"Not Found","statusCode":404}
```
