# Caso 001 - API REST con Node.js

Este proyecto es una API REST básica construida con Node.js, sin frameworks, que sirve información de productos desde una base de datos MySQL.
               

## Inicio manual
💡 ***Asegurate de estar ubicado en*** `estructura-grupo-2/caso-001`.  

1. Instalar las dependencias:

    ```
    npm install
    ```

2. Crear un archivo `.env` a partir de `.env.template` y completar los datos de conexión a tu base de datos MySQL.
    ``` .env
   DATABASE_HOST=localhost              # Host local por defecto
   DATABASE_PORT=3306                   # Puerto de MySQL 
   DATABASE_USER=root                   # Usuario 
   DATABASE_PASSWORD=tu_clave  
   DATABASE_NAME=product_master       
   ```

   Otras variables:
   ``` .env
   MAX_REQUESTS=3                       # Máximo de solicitudes en 20 segundos (simula status 429)
   AUTH_TOKEN=secret-token              # Token hardcodeado (simula status 401 y 403)
   ```

4. Inicializar la base de datos:

    Podés usar el archivo `init.sql` ubicado en la raíz del proyecto para crear la base de datos y poblarla con datos de ejemplo.  

5. Ejecutar la aplicación:

    ```
    npm run dev
    ```
    
## Incio con Docker
Requiere tener `Docker Desktop` instalado y en ejecución.  
  
💡 ***Asegurate de estar ubicado en*** `estructura-grupo-2/caso-001`.

### 1. Configurar variables de entorno
   Crear un archivo `.env` a partir de `.env.template` y completar los datos:  
   ``` .env
   DATABASE_HOST=mysql                # Nombre del servicio en Docker
   DATABASE_PORT=3306                 # Puerto de MySQL 
   DATABASE_USER=root                 
   DATABASE_PASSWORD=tu_clave  
   DATABASE_NAME=product_master       
   ```

  Otras variables:
  ``` .env
  MAX_REQUESTS=3                      # Máximo de solicitudes en 20 segundos (simula status 429) segundos. Simula status code 429
  AUTH_TOKEN=secret-token             # Token hardcodeado (simula status 401 y 403)
  ```
### 2. Construir y levantar los contenedores  
   ``` bash
   docker-compose up --build
   ```

  Esto ejecutará dos servicios:  
     - `app`: la API Node.js (puerto 3000)  
     - `mysql`: el contenedor de base de datos MySQL (puerto 3307)  

### 3. Apagar los contenedores  
  ```bash
  docker-compose down
  ```

### Logs  
Para ver los logs de la API en tiempo real, podés usar:
```bash
docker-compose logs -f app
```

Para ver los logs de la base de datos, podés usar:  
```bash
docker-compose logs -f mysql
```

## Testing con Postman
Se incluye la colección `Caso 001.postman_collection.json` en la raíz del proyecto.

### Importarla en Postman
1. Abrí Postman.  
2. Hacé clic en Import.  
3. Seleccioná el archivo `Caso 001.postman_collection.json`.  
4. Usá los endpoints para testear la API en `http://localhost:3000`.  
