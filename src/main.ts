import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AuthGuard } from './guards/auth/auth.guard'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
  .setTitle(process.env.API_TITLE)
  .setDescription(process.env.API_DESCRIPTION)
  .setVersion(process.env.API_VERSION)
  .addTag(process.env.API_TAGS)
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)

  // app.useGlobalGuards(new AuthGuard(
  //   new JwtService({ secret: process.env.API_JWT_SECRET })
  // ))
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  app.enableCors({
    origin: process.env.API_CORS_ORIGIN,
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  })


  await app.listen(process.env.PORT || 3001)

}

bootstrap()
