import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );

    const configService = app.get(ConfigService);

    const PORT = configService.get<number>("PORT") || 3000;

    await app.listen(PORT);
    console.log("Server Started!");
}

bootstrap();
