# Caso 001 - API REST con Node.js

Este proyecto es una API REST básica construida con Node.js, sin frameworks, que sirve información de productos desde una base de datos MySQL.
               

## Inicio

1. Instalar las dependencias:

    ```
    npm install
    ```

2. Crear un archivo `.env` a partir de `.env.template` y completar los datos de conexión a tu base de datos MySQL.

3. Inicializar la base de datos:

    Podés usar el archivo `init.sql` ubicado en la raíz del proyecto para crear la base de datos y poblarla con datos de ejemplo.  


4. Ejecutar la aplicación:

    ```
    npm run dev
    ```

## Docker Compose
1. Construir y levantar los contenedores
    ```bash
    docker-compose up --build
    ```
    Esto ejecutará dos servicios:
     - `app`: la API Node.js (puerto 3000)
     - `mysql`: el contenedor de base de datos MySQL (puerto 3307)

2. Apagar los contenedores
    ```bash
    docker-compose down
    ```
    
### Variables de entorno
    Crea un archivo .env en la raíz con el siguiente contenido:  

    ```
     DATABASE_HOST=mysql  
     DATABASE_PORT=3306  
     DATABASE_USER=root  
     DATABASE_PASSWORD=tu_clave  
     DATABASE_NAME=product_master  
    ```

### Logs
Para ver los logs de la API en tiempo real, podés usar:
```bash
docker-compose logs -f app
```

## Testing con Postman
Se incluye la colección `Caso 001.postman_collection.json` en la raíz del proyecto.

### Importarla en Postman
1. Abrí Postman.  
2. Hacé clic en Import.  
3. Seleccioná el archivo `Caso 001.postman_collection.json`.  
4. Usá los endpoints para testear la API en `http://localhost:3000`.  