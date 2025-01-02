# NestJS Base Project with PostgreSQL or MySQL

## Descripción
Este proyecto es una base para desarrollar aplicaciones con NestJS siguiendo una arquitectura hexagonal, utilizando bases de datos relacionales como PostgreSQL o MySQL. La estructura del proyecto está organizada para separar claramente las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

## Características
- Arquitectura hexagonal
- Integración con MongoDB
- Estructura modular y escalable
- Configuración para pruebas unitarias y de integración
- Documentación y ejemplos incluidos

## Requisitos Previos
- Node.js (v18 o superior)
- npm (v6 o superior)
- PostgreSQL o MySQL

## Instalación
1. Clona el repositorio:
   ```bash
   git clone git@ssh.dev.azure.com:v3/tres-astronautas-sas/dev-sec-ops/nest-base-3a-postgres
   cd nest-base-3a-postgres
   ```

2. Instalación de dependencias:
   ```bash
   npm install
   ```

3. Configuración de variables de entorno: Renombra el archivo `.env.example` por `.env` y configura las variables que requieras para tu proyecto:
   ```bash
   PORT=3000
   DB_TYPE=postgres  # o mysql
   DB_HOST=localhost
   DB_PORT=5432       # Puerto de PostgreSQL o el de tu base de datos
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tu_base_de_datos
   ```

## Uso
1. Iniciar servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```
2. La API estará disponible en `http://localhost:3000`.

## Estructura del proyecto

```plaintext
nest-base-3a
├─ doc                     # Documentación del proyecto
│  ├─ images               # Imágenes utilizadas en la documentación
│  └─ documentation.md     # Documentación principal del proyecto
├─ src
│  ├─ application          # Lógica de la aplicación y casos de uso
│  │  ├─ ports             # Interfaces y puertos de la aplicación
│  │  └─ use-cases         # Implementaciones de casos de uso
│  ├─ domain               # Lógica de dominio, servicios y entidades
│  │  ├─ exceptions        # Excepciones específicas del dominio
│  │  ├─ services          # Servicios de dominio
│  │  └─ shared            # Componentes compartidos del dominio (DTOs, enums, utilidades)
│  ├─ infrastructure       # Implementaciones de infraestructura (bases de datos, cachés, etc.)
│  │  ├─ cache             # Caché
│  │  ├─ database          # Conexión y repositorios de la base de datos
│  │  ├─ decorators        # Decoradores personalizados
│  │  ├─ environments      # Configuración de entornos
│  │  ├─ guards            # Guards para autenticación y autorización
│  │  ├─ ioc               # Inyección de dependencias (IoC)
│  │  ├─ rest              # Controladores y middleware de la API REST
│  │  ├─ sockets           # Implementaciones de WebSockets
│  │  ├─ strategies        # Estrategias de autenticación
│  │  └─ terminus          # Health checks y monitoreo
│  ├─ presentation         # Controladores y presentadores
│  │  ├─ controllers       # Controladores de la API
│  │  ├─ errors            # Manejo de errores
│  │  ├─ pipes             # Pipes personalizados
│  │  └─ view-models       # Modelos de vista y DTOs
│  ├─ app.module.ts        # Módulo raíz de la aplicación
│  └─ main.ts              # Punto de entrada de la aplicación
├─ test                    # Pruebas unitarias y de integración
│  └─ unit                 # Pruebas unitarias
├─ uploads                 # Directorio para archivos subidos
├─ azure-pipelines.yml     # Configuración de Azure Pipelines
├─ CHANGELOG.md            # Registro de cambios
├─ DIRECTORY_TREE.md       # Estructura del directorio en formato árbol
├─ Dockerfile              # Archivo Docker para contenedores
├─ id_rsa                  # Llave SSH (asegúrate de que este archivo no esté en el repositorio público)
├─ jest-e2e.json           # Configuración de Jest para pruebas E2E
├─ jest.config.json        # Configuración de Jest
├─ nest-cli.json           # Configuración de Nest CLI
├─ package-lock.json       # Archivo de bloqueo de npm
├─ package.json            # Archivo de configuración de npm
├─ README.md               # Este archivo README
├─ tsconfig.build.json     # Configuración de TypeScript para compilación
├─ tsconfig.doc.json       # Configuración de TypeScript para documentación
└─ tsconfig.json           # Configuración de TypeScript
```

## Documentación de la API
La documentación completa de la API está disponible en `http://localhost:3000` una vez que el servidor esté en funcionamiento.

## Pruebas
Ejecuta las pruebas unitarias:
   ```bash
   npm run test
   ```

Ejecuta las pruebas de integración:
   ```bash
   npm run test:e2e
   ```

## Automatización de Changelogs

Este proyecto utiliza `standard-version` para automatizar la generación del changelog siguiendo las convenciones de commit de Conventional Commits.

### Convenciones de Commits

Los mensajes de commit deben seguir la estructura de Conventional Commits:
```
<tipo>[scope opcional]: <descripción>
[cuerpo opcional]
[footer opcional]
```

#### Tipos de Commits

- **feat**: Introduce una nueva característica al código.
  ```bash
  feat: agregar soporte para autenticación con OAuth
  ```

- **fix**: Corrige un error en el código.
  ```bash
  fix: corregir error en la validación de email
  ```

- **docs**: Cambios en la documentación.
  ```bash
  docs: actualizar el README con nueva sección de instalación
  ```

- **style**: Cambios de formato que no afectan la funcionalidad del código.
  ```bash
  style: formatear código según las guías de estilo
  ```

- **refactor**: Refactorización del código que no corrige un error ni añade una característica.
  ```bash
  refactor: cambiar función de autenticación a async/await
  ```

- **perf**: Mejora del rendimiento del código.
  ```bash
  perf: mejorar la eficiencia del algoritmo de búsqueda
  ```

- **test**: Agrega o corrige pruebas.
  ```bash
  test: agregar pruebas unitarias para el módulo de autenticación
  ```

- **build**: Afecta el sistema de construcción o las dependencias externas.
  ```bash
  build: actualizar configuración de webpack
  ```

- **ci**: Cambios en la configuración de integración continua.
  ```bash
  ci: agregar configuración de Travis CI
  ```

- **chore**: Cambios menores que no afectan el código, como actualizaciones de dependencias.
  ```bash
  chore: actualizar dependencias de npm
  ```

- **revert**: Revierte un commit anterior.
  ```bash
  revert: revertir commit abc123
  ```

### Uso de `standard-version`

Para generar una nueva versión y actualizar el changelog automáticamente, sigue estos pasos:

1. Asegúrate de que todos tus cambios estén comiteados.
2. Ejecuta el siguiente comando:
   ```bash
   npm run release
   ```
3. Revisa los cambios generados y realiza un push a tu repositorio.

Estos pasos asegurarán que el changelog se mantenga actualizado automáticamente y que las versiones se generen siguiendo un proceso estandarizado.

## Contribución
¡Las contribuciones son bienvenidas! Por favor sigue estos pasos para contribuir:
1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Haz tus cambios.
4. Haz un commit de tus cambios (`git commit -m 'feat: Añadir nueva característica'`).
5. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
6. Abre un Pull Request.


## Contacto
-Gustavo Erazo - [erazo.gustavo@gmail.com](mailto:erazo.gustavo@gmail.com)

