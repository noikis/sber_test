# Getting Started

```bash
cp .env.example .env
```
## Setup Database
```bash
docker-compose up -d
npx prisma migrate dev
```

## Seed Random Data
```bash
npx prisma db seed
```

## Run App
```bash
nvm use
npm install 
npm run start
```

### Links 
swagger: http://localhost:3000/api/documentation


