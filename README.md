Student
Name: Терещенко Іван Олегович
Group: 232\2
 
## Практичне заняття №4 — DTO + class-validator + Pipes
 
### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
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
 
### Тест валідації — порожнє ім'я категорії
```text
{"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — від'ємна ціна продукту
```text
{"message":["price must be not less than 0.01"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — зайве поле
```text
{"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
```
 
### Тест TrimPipe
```text
# Input: {"name": "  Accessories  "}
# Result: {"name": "Accessories"} (пробіли обрізано)
```
 
### Тест валідне створення продукту
```text
StatusCode: 201
Content: {"id":1,"name":"iPhone 16","price":999.99,"stock":50,"categoryId":1}
```

