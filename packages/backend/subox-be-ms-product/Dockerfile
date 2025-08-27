# -------- Build --------
FROM maven:3.9.7-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY pom.xml .
# cache de dependencias
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests dependency:go-offline

COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests package

# deja el artefacto con nombre fijo
RUN cp target/*-SNAPSHOT.jar /workspace/app.jar || cp target/*.jar /workspace/app.jar

# -------- Runtime --------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app.jar /app/app.jar

# si el micro usa otro puerto interno, cámbialo aquí o por ENV SERVER_PORT en compose
EXPOSE 7003

ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
