import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import { DateTime } from 'luxon';
import { LoggingInterceptor } from 'infrastructure/rest/logging.interceptor';
import { ValidationPipe } from 'infrastructure/rest/validation.pipe';
import session from 'express-session';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './infrastructure/rest/filters/app-exception.filter';
import { ResponseInterceptor } from './infrastructure/rest/interceptors/response.interceptor';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.use(session({
      secret: process.env.SECRET_KEY_SESSION, // Usa una clave secreta para la sesión
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }, // Configura la duración de la cookie de sesión
      // Añade más configuraciones según tus necesidades
    }));
    const appVersion = process.env.API_VERSION;
    Logger.log(
      `Environment: ${process.env.NODE_ENV?.toUpperCase()}`,
      'Bootstrap',
    );

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    // REST Global configurations
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AppExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    const APP_NAME = process.env.APP_NAME;
    const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
    const API_VERSION = process.env.API_VERSION;
    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .setVersion(API_VERSION)
      .addBearerAuth(
        {
          description: `Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'Authorization',
      )
      .build();
    app.setGlobalPrefix("api");
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    SwaggerModule.setup('/', app, document);
    const HOST = process.env.HOST;
    const PORT = process.env.PORT;
    const d = DateTime.local();
    const timezone = d.zoneName;
    await app.listen(PORT, HOST, async () => {
      Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
      Logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer');
      Logger.log(`Enviroment running at ${process.env.NODE_ENV}`);
      Logger.log(`App Version ${appVersion}`);
      Logger.log(`🚀  Server is running at ${await app.getUrl()}`);
      Logger.log(`Timezone:  ${timezone}`);
    });
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
