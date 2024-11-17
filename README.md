# Getting Started

```bash
cp .env.example .env
```

## Run Docker Containers
```bash
docker-compose build
docker-compose up -d
```

## Setup Database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```


