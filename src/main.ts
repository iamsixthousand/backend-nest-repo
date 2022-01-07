import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
