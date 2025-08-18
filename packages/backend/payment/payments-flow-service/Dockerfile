FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
ARG JAR_FILE=target/payments-flow-service-0.1.0.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
