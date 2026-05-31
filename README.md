## Student
- Name: Терещенко Іван Олегович
- Group: 232\2
 
## Практичне заняття №2 — NestJS + PostgreSQL + Redis
 
## Структура репозиторію
```
.
├── src/              	# NestJS source code
├── Dockerfile
├── docker-compose.yml
├── .env.example      	# шаблон змінних оточення
└── README.md
```
 
## Запуск проекту
```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```
 
## Перевірка сервісів
```text
NAME                     IMAGE                    COMMAND                  SERVICE    STATUS              PORTS
hlpf-env-setup-app-1     hlpf-env-setup-app       "docker-entrypoint.s…"   app        Up                  0.0.0.0:3000->3000/tcp
hlpf-env-setup-postgres-1 postgres:16-alpine      "docker-entrypoint.s…"   postgres   Up (healthy)        0.0.0.0:5432->5432/tcp
hlpf-env-setup-redis-1   redis:7-alpine           "docker-entrypoint.s…"   redis      Up (healthy)        0.0.0.0:6379->6379/tcp
```
 
## Перевірка PostgreSQL
```text
List of databases
  Name    |  Owner   | Encoding | Collation | Ctype | Access privileges
----------+----------+----------+-----------+-------+-------------------
 nestdb   | nestuser | UTF8     | en_US.utf8| en_US.|
(1 row)
```
 
## Перевірка Redis
```text
PONG
```
 
## Перевірка застосунку
```text
Hello World!
```
 
## Логи NestJS (фрагмент)
```text
[Nest] LOG [NestApplication] Nest application successfully started
[Nest] LOG [TypeOrmModule] TypeORM initialized successfully
```
