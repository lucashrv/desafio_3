import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );

    // SWAGGER
    const config = new DocumentBuilder()
        .setTitle("Physical Store")
        .setDescription("Documentação da API com Swagger")
        .setVersion("1.0")
        .addTag("Store")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const PORT = process.env.PORT || 3000;

    await app.listen(PORT);
    console.log("Server Started!");
}

bootstrap();
