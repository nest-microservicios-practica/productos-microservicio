import z from "zod";
import 'dotenv/config';

//*! no necesito la variable PORT porque el microservicio de auth no va a escuchar en un puerto, sino que va a recibir mensajes a través de NATS,
// si la llegara a necesitar tendria que agregarla aca, en el main.ts para que sea un microservicio hibrido, en el docker-compose.yml y en el docker-compose.prod.yml,
// microservicio de pagos es hibrido y sirve de ejemplo en el main.ts, ya que funciona con nats y expone puerto para peticiones http
export const envSchema = z.object({
  // PORT: z.coerce.number({'message': 'puerto requerido y debe ser un número'}),// .default(3000),
  DATABASE_URL: z.string().min(1, { message: 'se requiere una URL de base de datos válida' }),
  NATS_SERVERS: z.array(z.string().url()).min(1, { message: 'se requiere al menos un servidor NATS' }),
});

const { data, error } = envSchema.safeParse({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','), // esto lo hacemos para que lo pueda validar como un array, ya que no lo es
});

if (error) {
    const mensajes = error.issues
        .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
        .join('\n');
    console.log('**** ERROR DE VARIABLES DE ENTORNO ****');
    console.log(mensajes);


  throw new Error(
      `Variables de entorno inválidas:`,
    );
}

export const envs = {
  // port: data?.PORT,
  natsServers: data?.NATS_SERVERS,
  databaseUrl: data?.DATABASE_URL,
};
