
# Caso 001 - API REST con Node.js

Bienvenido/a 👋
Este proyecto es un ejemplo básico de una API REST usando Node.js sin frameworks.
Sirve productos desde una base de datos MySQL y está preparado tanto para correr manualmente como en Docker.
               
## 🧰 Tecnologías utilizadas
⚙️ Node.js (sin frameworks)  
🐬 MySQL  
🐳 Docker  
🧪 Postman (para testing de endpoints)  
📦 dotenv (para variables de entorno)  

## Inicio manual
1. clona el repositorio 
    ```bash
    git clone https://github.com/AbrilSabatini/estructura-grupo-2.git 
    ```
2. dirigete a la carpeta del proyecto   
    
    ```bash
    cd estructura-grupo-2/caso-001
    ```
💡 ***Asegurate de estar ubicado en*** `estructura-grupo-2/caso-001`.  

3. Instalar las dependencias:

    ```
    npm install
    ```
## 📦 dotenv
4. Crear un archivo `.env` en la raiz del proyecto a partir de `.env.template` y completar los datos de conexión a tu base de datos MySQL.
    ``` .env
   DATABASE_HOST=localhost              # Host local por defecto
   DATABASE_PORT=3306                   # Puerto de MySQL 
   DATABASE_USER=root                   # Usuario 
   DATABASE_PASSWORD={tu_clave}         # Importante! Puede quedar vacía   
   DATABASE_NAME=product_master       
   ```

   Otras variables:
   ``` .env
   PORT=3000                            # Puerto de la aplicación
   MAX_REQUESTS=3                       # Máximo de solicitudes en 20 segundos (simula status 429)
   AUTH_TOKEN=secret-token              # Token hardcodeado (simula status 401 y 403)
   ```
## 🐬 mysql
5. Inicializar la base de datos:

    ( **Opcional** ) Podés usar el archivo `init.sql` ubicado en la raíz del proyecto para crear la base de datos y poblarla con datos de ejemplo.  
    ```bash
    npm run init_db 
    ```
6. Ejecutar la aplicación:

    ```
    npm run dev
    ```
    
## 🐳 Incio con Docker
Requiere tener `Docker Desktop` instalado y en ejecución.  
  
📁 Asegurate de estar dentro de la carpeta del caso:

    estructura-grupo-2/caso-001
    
- ### ⚙️ Opción 1: Configuración automática (recomendada)   

    - Ejecutar: 
    
       ```bash
       npm run build
       ```
       Esto:  
        - Crea el archivo .env haciendo preguntas interactivas.  
        - Levanta automáticamente los contenedores.   
- ### 📝 Opción 2: 
    ### 1. Configuración manual
   
    - Crear un archivo `.env` a partir de `.env.template` y completar los datos:  
        ```bash
        PORT=3000
        DATABASE_HOST=mysql                # Nombre del servicio en Docker
        DATABASE_PORT=3306                 # Puerto de MySQL 
        DATABASE_USER=root                 
        DATABASE_PASSWORD={tu_clave}       # Importante! Puede quedar vacía  
        DATABASE_NAME=product_master       
        ```

        Otras variables:
        ```bash
        PORT=3000                           # Puerto de la aplicación
        MAX_REQUESTS=3                      # Máximo de solicitudes en 20 segundos (simula status 429). 
        AUTH_TOKEN=secret-token             # Token hardcodeado (simula status 401 y 403)
        ```
    ### 2. Construir y levantar los contenedores 
    ```bash
    docker-compose up --build
    ```
    Esto ejecutará dos servicios:  
         - `app`: la API Node.js (puerto 3000)  
         - `mysql`: el contenedor de base de datos MySQL (puerto 3307)  

### - Apagar los contenedores  
  ```bash
  docker-compose down
  ```

### - Logs  
Para ver los logs de la API en tiempo real, podés usar:
```bash
docker-compose logs -f app
```

Para ver los logs de la base de datos, podés usar:  
```bash
docker-compose logs -f mysql
```

## 🧪 Testing con Postman
Se incluye la colección `Caso 001.postman_collection.json` en la raíz del proyecto.

### Importarla en Postman
    1. Abrí Postman.  
    2. Hacé clic en Import.  
    3. Seleccioná el archivo `Caso 001.postman_collection.json`.  
    4. Usá los endpoints para testear la API en `http://localhost:3000`.  
