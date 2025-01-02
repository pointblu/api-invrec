FROM node:21.7.1 as development

# Instalación de dependencias del sistema
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libxss1 \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    tzdata

# Instalación de Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install

# Configuración del directorio de trabajo
WORKDIR /usr/src/app

# Copia de los archivos de configuración de npm
COPY package*.json ./

# Instalación de dependencias de desarrollo
RUN npm install --force --only=development

# Instalación de bcrypt y husky
RUN npm install bcrypt --force
RUN npm install husky -g

# Configuración de husky
RUN npx husky install

# Verificación de las versiones de Node.js y npm
RUN node -v && npm -v

# Copia del código fuente
COPY . .

# Construcción del proyecto
RUN npm run build

# Fase de producción
FROM node:21.7.1 as production

# Configuración de la variable de entorno
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Instalación de dependencias del sistema
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libxss1 \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    tzdata

# Instalación de Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install

# Configuración del directorio de trabajo
WORKDIR /usr/src/app

# Copia de los archivos de configuración de npm
COPY package*.json ./

# Instalación de dependencias de producción
RUN npm install --force --only=production

# Instalación de bcrypt y husky
RUN npm install bcrypt --force
RUN npm install husky -g

# Configuración de husky
RUN npx husky install

# Copia del código fuente y los archivos construidos
COPY . .
COPY --from=development /usr/src/app/dist ./dist

# Configuración de la zona horaria
ENV TZ=America/Bogota
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]

# Exposición del puerto
EXPOSE 3000
