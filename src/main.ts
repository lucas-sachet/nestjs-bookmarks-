import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        //remove everything from the body that's not defined
        whitelist: true
    }))
    await app.listen(8000);
}
bootstrap();
