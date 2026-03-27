Si modificamos el modelo producto del archivo schema.prisma, ejemplo le creamos un campo mas, para que se cree y ejecute la migracion al mismo tiempo, desde la terminal debemos ejecutar algo como:
  npx prisma migrate dev --name campoDisponible

despues debemos actualizar el cliente de prisma, para ello ejecutamos el comando:
npx prisma generate


# pasos para convertir un proyecto en microservicios

ajustar el archivo main.ts como lo tenemos e indicar el protolo con el que se comunicara con los otros microservicios, ejemplo TCP