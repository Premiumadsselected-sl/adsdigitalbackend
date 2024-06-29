import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as express from 'express'
import { join } from 'path'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  const allowedOrigins = process.env.API_CORS_ORIGIN.split(',')
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })

  // app.enableCors()

  const config = new DocumentBuilder()
  .setTitle(process.env.API_TITLE)
  .setDescription(process.env.API_DESCRIPTION)
  .setVersion(process.env.API_VERSION)
  .addTag(process.env.API_TAGS)
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.use('/api/docs', express.static(join(__dirname, '..', 'node_modules', 'swagger-ui-dist')))

  // Note: The following code is commented out because the AuthGuard 
  // class is not yet implemented globally in the application.
  // app.useGlobalGuards(new AuthGuard(
  //   new JwtService({ secret: process.env.API_JWT_SECRET })
  // ))

  await app.listen(process.env.PORT || 3001)

}

bootstrap()
