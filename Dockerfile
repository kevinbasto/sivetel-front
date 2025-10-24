# Etapa 1: Construcción de la aplicación Angular
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción con base href
RUN npm run build -- --base-href=/servicios/ --deploy-url=/servicios/

# Etapa 2: Servir con Apache
FROM httpd:2.4-alpine

# Copiar la configuración personalizada de Apache
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

# Habilitar mod_rewrite y otros módulos necesarios
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist/front /usr/local/apache2/htdocs/

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar Apache en el puerto 4200
CMD sed -i 's/Listen 80/Listen 4200/g' /usr/local/apache2/conf/httpd.conf && httpd-foreground