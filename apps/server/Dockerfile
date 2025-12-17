# Build Stage
FROM gradle:9.2.1-jdk25 AS builder

WORKDIR /app

COPY ./ ./

RUN gradle --no-daemon build -x test

# Final Stage
FROM gcr.io/distroless/java25-debian13

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
