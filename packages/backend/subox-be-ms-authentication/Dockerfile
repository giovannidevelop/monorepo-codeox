# Utiliza una imagen base con Java 17 y Maven preinstalados
FROM maven:3.8-openjdk-17-slim AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo pom.xml para resolver las dependencias
COPY pom.xml .

# Descarga las dependencias del proyecto
RUN mvn dependency:go-offline

# Copia el código fuente del proyecto
COPY src ./src

# Compila y empaqueta la aplicación
RUN mvn package -DskipTests

# Crea una imagen final con Java 17 y el artefacto construido
FROM openjdk:17-slim-buster

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el artefacto JAR desde la etapa de compilación
COPY --from=build /app/target/aud-0.0.1-SNAPSHOT.jar .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 7000

# Define el comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["java", "-jar", "aud-0.0.1-SNAPSHOT.jar"]