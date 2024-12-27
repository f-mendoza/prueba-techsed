# Proyecto Next.js

Este proyecto es una aplicación desarrollada con [Next.js](https://nextjs.org/).

## Pasos para levantar el proyecto

1. **Clonar el repositorio**

   Clona este repositorio en tu máquina local ejecutando el siguiente comando:

   ```bash
   git clone https://github.com/f-mendoza/prueba-techsed.git
   ```

2. **Instalar dependencias**

   Navega al directorio del proyecto y ejecuta:

   ```bash
   npm install
   ```

3. **Levantar el servidor**
   Para iniciar el servidor de desarrollo, ejecuta:
   ```bash
   npm run dev
   ```
   Luego, accede a la aplicación en tu navegador en http://localhost:3000.

## Ejecucion de tests

Este proyecto utiliza Playwright para los tests. Hay dos formas de ejecutar los tests:

1. **Desde la terminal:**

   ```bash
   npx playwright test
   ```

1. **Visualmente con la UI de Playwright:**
   ```bash
   npx playwright test --ui
   ```
