AuthService

AuthService es un microservicio desarrollado en Java con Spring Boot que proporciona autenticación y autorización utilizando JWT (JSON Web Tokens). Este servicio gestiona el registro, inicio de sesión, y emisión de tokens JWT para usuarios, asegurando la protección de las APIs de otros microservicios.

Características

Registro de usuarios con contraseñas hasheadas utilizando BCrypt.

Autenticación de usuarios y generación de tokens JWT.

Validación de tokens JWT para acceso a recursos protegidos.

Endpoint para renovación de tokens (refresh tokens).

Tecnologías Utilizadas

Lenguaje: Java 17

Framework: Spring Boot 3.x

Autenticación y Autorización: Spring Security

Base de Datos: MySQL

JWT: JJWT (Java JSON Web Token)

Herramientas de Build: Maven

Requisitos Previos

JDK 17 o superior.

Maven instalado.

MySQL configurado y ejecutándose.

Variables de entorno configuradas:

JWT_SECRET: Clave secreta para firmar los tokens JWT.

DB_URL: URL de conexión a la base de datos.

DB_USERNAME: Usuario de la base de datos.

DB_PASSWORD: Contraseña de la base de datos.