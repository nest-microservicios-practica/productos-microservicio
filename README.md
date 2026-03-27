# Product Microservice

su base de datos es un archivo fisico llamado dev.db, ya que su base de datos la tenemos en sqlite

## para levantar el proyecto 

1. Clonar el repositorio https://github.com/nest-microservicios-practica/productos-microservicio.git
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Ejecutar migración de prisma `npx prisma migrate dev`
5. Ejecutar `npm run start:dev`


## notas personales

Si modificamos el modelo producto del archivo schema.prisma, ejemplo le creamos un campo mas, para que se cree y ejecute la migracion al mismo tiempo, desde la terminal debemos ejecutar algo como:
  npx prisma migrate dev --name campoDisponible

despues debemos actualizar el cliente de prisma, para ello ejecutamos el comando:
npx prisma generate

# Pasos para convertir un proyecto en microservicios

ajustar el archivo main.ts como lo tenemos e indicar el protolo con el que se comunicara con los otros microservicios, ejemplo TCP