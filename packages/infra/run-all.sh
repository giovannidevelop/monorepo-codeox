#!/bin/bash

# Carpeta de logs
mkdir -p logs

# Iniciar MySQL
echo "Iniciando servicio MySQL..."
echo "Azl512la." | sudo -S systemctl start mysql

# Lanzar subox-fe-main (npm start)
(
  cd ../frontend/subox-fe-main || exit 1
  echo "Iniciando subox-fe-main (npm start)..."
  npm start > ../../infra/logs/subox-fe-main.log 2>&1
) &

# Lanzar subox-fe-portafolio (npm start)
(
  cd ../frontend/subox-fe-portafolio || exit 1
  echo "Iniciando subox-fe-portafolio (npm start)..."
  #npm start > ../../infra/logs/subox-fe-portafolio.log 2>&1
) &

# Lanzar cliente-service (mvn spring-boot:run)
(
  cd ../backend/cliente-service || exit 1
  echo "Iniciando cliente-service (mvn spring-boot:run)..."
  mvn spring-boot:run > ../../infra/logs/cliente-service.log 2>&1
) &

# Lanzar producto-service (mvn spring-boot:run)
(
  cd ../backend/producto-service || exit 1
  echo "Iniciando producto-service (mvn spring-boot:run)..."
  mvn spring-boot:run > ../../infra/logs/producto-service.log 2>&1
) &

# Lanzar json-server (instalar si no está)
(
  cd ../frontend/subox-fe-main || exit 1
  if [ ! -f node_modules/.bin/json-server ]; then
    echo "json-server no encontrado. Instalando..."
    npm install json-server
  fi
  echo "Iniciando JSON Server (npx json-server --watch public/data/db.json --port 7000)..."
  npx json-server --watch public/data/db.json --port 7000 > ../../infra/logs/json-server.log 2>&1
) &

echo "Todos los servicios están siendo levantados en segundo plano."
echo "Revisa los archivos en packages/infra/logs/*.log para ver la salida de cada servicio."
echo "Presiona Ctrl+C para detener todo."

wait
