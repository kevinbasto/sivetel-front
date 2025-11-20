#!/bin/bash

# Configuración
BUILD_PATH="dist/front/browser"
DEPLOY_PATH="/var/www/diazysolis.com/servicios"
BASE_HREF="/servicios/"

echo "🚀 Iniciando deploy..."

# Build con manejo de errores
echo "📦 Construyendo aplicación..."
if ! ng build --configuration=production --base-href "$BASE_HREF"; then
    echo "❌ Error en el build. Deploy cancelado."
    exit 1
fi

# Verificar que existe el directorio de build
if [ ! -d "$BUILD_PATH" ]; then
    echo "❌ No se encontró el directorio de build: $BUILD_PATH"
    exit 1
fi

# Backup opcional (descomenta si lo necesitas)
# echo "💾 Creando backup..."
# cp -r "$DEPLOY_PATH" "${DEPLOY_PATH}.backup.$(date +%Y%m%d_%H%M%S)"

# Limpiar destino
echo "🧹 Limpiando directorio destino..."
rm -rf "${DEPLOY_PATH:?}"/*

# Copiar archivos
echo "📋 Copiando archivos..."
if cp -r "$BUILD_PATH"/* "$DEPLOY_PATH/"; then
    echo "✅ Deploy completado exitosamente!"
else
    echo "❌ Error al copiar archivos"
    exit 1
fi