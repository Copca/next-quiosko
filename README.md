# Pasos Iniciales para crear un Proyecto con Next.js, TypeScript, Taildwind

## Crear el proyecto

```
npx create-next-app@latest --typescript
```

## Instalar Taildwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

## Agregar el content en `taildwind.config`

```
 content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

## Agregar las directivas de Taildwins `public/styles/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# Configuración de Base de Datos por medio de Docker Compose

Para correr localmente

```
docker compose up -d
```

-   el -d, significa **detached**

## Configurar las variables de entorno

-   Renombrar el archivo **.env.template** a **.env**
-   MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb

```

-   Reconstruir los módulos de node y levantar Next

npm install
npm run dev

```

-   Llenar la base de datos con información de pruebas
```

# Configuración de Prisma

Instalamos dependencias

```
npm i -D prisma
npm i @prisma/client
npx prisma init
```

Despues de hacer el modelado de la DB (pasa el código de Prisma a SQL)

```
npx prisma migrate dev
```

Reset de la DB con Prisma

```
npx prisma migrate reset
```

Abrir Prisma Studio

```
npx prisma studio
```

Cargar la base de datos con "seedData"

1. Crear los archivos sedData en **/prisma/data/**
2. Hacer el archivo de carga **/prisma/seed.ts**
3. Instalar la dependencia `npm i ts-node`
4. Modificar el archivo package.json

```
"prisma": {
		"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
	},
```

5. Cargar seedData

```
npx prisma db seed
```
