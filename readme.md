# Documentación API REST FILES de Gestión de Productos y Categorías e-comerce

## Descripción

Esta API está diseñada para ser usada por una aplicación de gestión de productos y categorías, incluyendo funcionalidades de autenticación de usuarios y manejo de imágenes.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- Cloudinary para manejo de imágenes
- CORS

## Modelos

- **User**: Usuarios que pueden registrarse y loguearse.
  - `userName`: Nombre de usuario.
  - `password`: Contraseña.
  - `avatar`: Imagen de avatar.
  - `rol`: Rol del usuario.
  - `favorites`: Lista de productos favoritos del usuario.
- **Product**: Productos disponibles en la plataforma.
  - `name`: Nombre del producto.
  - `image`: Imagen del producto.
  - `categories`: Categorías a las que pertenece el producto.
  - `price`: Precio del producto.
  - `stock`: Disponibilidad del producto.
- **Category**: Categorías asociadas a los productos.
  - `name`: Nombre de la categoría.
  - `logo`: Logo de la categoría.
  - `products`: Lista de productos asociados a la categoría.

## Endpoints

### Autenticación

- **POST** `/users/register`: Registrar un nuevo usuario.
- **POST** `/users/login`: Loguear un usuario y devolver un JWT.

### Usuarios

- **GET** `/users`: Lista de todos los usuarios.
- **PUT** `/users/auth/avatar`: Editar campos del usuario y añadir/cambiar un avatar subiendo una imagen a Cloudinary (Requiere JWT), no hace falta pasar id, lo coge del bearer.
- **PUT** `/users/auth/:id`: Modificar el rol de un usuario (Requiere JWT y rol de Admin)
- **DELETE** `/users/auth/deleteUser`: Eliminar un usuario (Requiere JWT).

### Productos

- **GET** `/products`: Listar todos los productos.
- **GET** `/products/categories/:categories`: Listar todos los productos según la categoría especificada.
- **GET** `/products/price/:price`: Listar todos los productos según el precio especificado.
- **GET** `/products/:id`: Obtener un producto específico.
- **POST** `/products`: Crear un nuevo producto (se puede subir archivos de imagen a Cloudinary) (Requiere JWT).
- **POST** `/products/:id/favorites`: Añadir un producto a la lista de favoritos del usuario (Requiere JWT).
- **PUT** `/products/:id`: Actualizar un producto (Cloudinary) (Requiere JWT).
- **DELETE** `/products/:id`: Eliminar un producto (Requiere JWT).

### Categorías

- **GET** `/categories`: Listar todas las categorías.
- **GET** `/categories/:id`: Obtener una categoría específica.
- **POST** `/categories`: Crear una nueva categoría (Cloudinary) (Requiere JWT).
- **PUT** `/categories/:id`: Actualizar una categoría (Cloudinary) (Requiere JWT).
- **DELETE** `/categories/:id`: Eliminar una categoría (Requiere JWT).

## Seguridad

- Todas las operaciones sensibles están protegidas con JWT.
- La API está configurada con un rate-limiter de 3 minutos para evitar abuso del servicio.

## Reutilización del Storage de Cloudinary

El almacenamiento de archivos en Cloudinary se puede reutilizar cambiando la carpeta de destino en la función de subida. Esto permite una mayor flexibilidad y organización en el almacenamiento de archivos.

```javascript
// Ejemplo de uso en el controlador de usuario
const result = await uploadToCloudinary(req.file.path, 'user_avatars');
newUser.avatar = result.secure_url;
// Cambiar 'user_avatars' a cualquier otra carpeta para reutilizar el storage, por ejemplo 'admin_avatars'
const result = await uploadToCloudinary(req.file.path, 'admin_avatars');


## Despliegue

[store-server8 | vercel](https://server8.vercel.app/api/v1/)
