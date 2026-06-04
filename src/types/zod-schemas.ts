import { z } from "zod";

export const contactSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellido: z.string().min(1, "El apellido es requerido"),
    correo: z.string().min(1, "El correo es requerido").email("Ingresa un correo válido"),
    mensaje: z.string().min(1, "El mensaje es requerido"),
});

export type ContactForm = z.infer<typeof contactSchema>;
