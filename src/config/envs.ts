import z from "zod";
import 'dotenv/config';

export const envSchema = z.object({
  PORT: z.coerce.number({'message': 'puerto requerido y debe ser un número'}),// .default(3000),
});

const { data, error } = envSchema.safeParse(process.env);

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
  port: data?.PORT,
};
