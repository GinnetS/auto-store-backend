# Auto Store Backend (NestJS)

Cumple los requisitos de la prueba técnica:

- API REST en NestJS (catálogo de productos de autos y categorías)
- Dos tipos de usuarios: **cliente** y **admin** (JWT + roles)
- Pagos con **PayPal** (Sandbox, Orders API: create & capture)
- Caché con **Redis** (cache interceptor en listados)
- Base de datos **PostgreSQL** (TypeORM)
- Infraestructura con **Docker Compose** (api + postgres + redis)
- Documentación con **Swagger**

## Levantar con Docker

1. Copia `.env.example` a `.env` y completa credenciales de PayPal Sandbox.
2. `docker compose up --build`

API en `http://localhost:3000/api`  
Swagger en `http://localhost:3000/api/docs`

## Usuarios y Roles

- `POST /api/auth/register` -> crea usuario (role por defecto: client).
- `POST /api/auth/login` -> retorna JWT.
- Rutas protegidas de admin usan `@Roles('admin')`.

## Pagos (PayPal Sandbox)

- `POST /api/payments/create-order` body: `{ "items": [{ "name": "Filtro", "unit_amount": "39.90", "quantity": 1 }], "currency": "USD" }`
- `POST /api/payments/capture/:orderId`

## Caché Redis

- Listado de productos (`GET /api/products`) usa `CacheInterceptor`.
- Config redis desde `.env`.
