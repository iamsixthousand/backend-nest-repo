import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    const configSwagger = new DocumentBuilder()
        .setTitle('Server documentation')
        .setDescription('REST API use guide')
        .setVersion('1.0.0')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('/app/docs', app, swaggerDocument);

    // app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
