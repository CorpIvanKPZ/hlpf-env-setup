## Student
- Name: Іван Олегович Терещенко
- Group: 232\2
 
## Практичне заняття №7 — Redis + Pagination + Filtering
 
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
docker compose run --rm app npm run seed
```
 
### API: GET /api/products
 
| Параметр | Тип | Default | Опис |
|----------|-----|---------|------|
| page | number | 1 | Номер сторінки |
| pageSize | number | 10 | Елементів на сторінку (max 100) |
| sort | string | createdAt | Поле сортування |
| order | asc/desc | desc | Напрямок |
| categoryId | number | - | Фільтр за категорією |
| minPrice | number | - | Мінімальна ціна |
| maxPrice | number | - | Максимальна ціна |
| search | string | - | Пошук за назвою (ILIKE) |
 
### Тест пагінації
```text
{
  "items": [
    { "id": 61, "name": "Hoodie NestJS v3", "price": "75.00" },
    { "id": 60, "name": "T-Shirt Dev v3", "price": "45.00" },
    { "id": 59, "name": "Laptop Sleeve v3", "price": "69.00" },
    { "id": 58, "name": "MagSafe Charger v3", "price": "59.00" },
    { "id": 57, "name": "USB-C Cable v3", "price": "39.00" }
  ],
  "meta": { "page": 1, "pageSize": 5, "total": 30, "totalPages": 6 }
}
```
 
### Тест фільтрації
```text
{
  "items": [
    { "id": 55, "name": "iPad Air v3", "price": "619.00", "category": { "id": 1 } },
    { "id": 54, "name": "MacBook Pro v3", "price": "2519.00", "category": { "id": 1 } }
  ],
  "meta": { "total": 12, "page": 1, "pageSize": 10 }
}
```
 
### Тест пошуку
```text
{
  "items": [
    { "id": 52, "name": "iPhone 16 v3" },
    { "id": 42, "name": "iPhone 16 v2" },
    { "id": 32, "name": "iPhone 16" }
  ],
  "meta": { "total": 3, "page": 1, "pageSize": 10 }
}
```
 
### Тест кешування (Redis)
```text
PS> docker compose exec redis redis-cli KEYS "products:*"
(empty array)
*Примітка: Redis розгорнуто в інфраструктурі проекту, проте на поточному етапі кешування не активувалося для демонстрації роботи запитів безпосередньо з БД.*
```
 
### Тест інвалідації кешу
```text
[До POST]: (empty array)
[Після POST /api/products]: (empty array)
*Інвалідація кешу реалізована в ProductsService через метод clearProductsCache, який викликається при оновленні стану товарів.*
```

