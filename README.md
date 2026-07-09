# Hidroequipos - Frontend

Este es el frontend del proyecto Hidroequipos, desarrollado con [Next.js](https://nextjs.org/) utilizando el App Router.

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (React 19)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) y [Radix UI](https://www.radix-ui.com/)
- **Manejo de Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching & Caché:** [TanStack React Query](https://tanstack.com/query/latest)
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Peticiones HTTP:** [Axios](https://axios-http.com/)
- **Gráficos:** [Recharts](https://recharts.org/)

## 📦 Instalación de dependencias y `pnpm`

Este proyecto utiliza **pnpm** como gestor de paquetes para garantizar instalaciones rápidas y eficientes y manejar correctamente las dependencias.

### 1. Instalar pnpm (si no lo tienes)

Si aún no tienes `pnpm` instalado en tu sistema, la forma más sencilla de instalarlo es globalmente a través de npm:

```bash
npm install -g pnpm
```


### 2. Instalar dependencias del proyecto

Una vez clonado el repositorio y con `pnpm` instalado, abre una terminal en la raíz del proyecto y ejecuta:

```bash
pnpm install
```

## 🛠️ Cómo correr el proyecto

Después de instalar las dependencias, asegúrate de tener configuradas tus variables de entorno, copia `.env.example` y renómbralo a `.env.local`.

Para iniciar el servidor de desarrollo, ejecuta:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación. El proyecto cuenta con Hot Reload, por lo que se actualizará automáticamente al guardar los cambios en el código.

## 📂 Estructura del Proyecto

El código fuente se encuentra contenido en la carpeta `src/`. La arquitectura está organizada combinando el enrutamiento de Next.js y un patrón de organización por features para mayor escalabilidad:

```text
src/
├── app/          # Enrutamiento principal (Next.js App Router), layouts y páginas.
├── components/   # Componentes UI reutilizables (botones, modales, etc. y componentes de shadcn/ui).
├── features/     # Componentes, lógica y servicios agrupados por funcionalidad o dominio del negocio.
├── hooks/        # Custom hooks genéricos de React.
├── lib/          # Funciones utilitarias, configuración de librerías de terceros (ej. cliente Axios).
└── providers/    # Componentes envolventes para contextos globales (ej. ThemeProvider, QueryClientProvider).
```

## 📜 Scripts disponibles

- `pnpm dev`: Inicia el entorno de desarrollo.
- `pnpm build`: Construye la aplicación optimizada para producción.
- `pnpm start`: Inicia el servidor de producción (requiere construir la aplicación previamente).
- `pnpm lint`: Ejecuta el linter (ESLint) para detectar problemas en el código.
