# Etapa build
FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Etapa run
FROM openjdk:17-slim-buster
WORKDIR /app
ARG JAR_NAME
ARG PORT
COPY --from=build /app/target/${JAR_NAME} .
EXPOSE ${PORT}
CMD ["sh", "-c", "java -jar ${JAR_NAME}"]
