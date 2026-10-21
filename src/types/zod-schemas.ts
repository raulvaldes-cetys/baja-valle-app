import { z } from "zod";

export const contactSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellido: z.string().min(1, "El apellido es requerido"),
    correo: z.string().min(1, "El correo es requerido").email("Ingresa un correo válido"),
    mensaje: z.string().min(1, "El mensaje es requerido"),
});

export type ContactForm = z.infer<typeof contactSchema>;


export const loginSchema = z.object({
    email: z.string().trim().min(1, "El correo es requerido").email("Ingresa un correo válido").max(254, "El correo es demasiado largo"),
    password: z.string().min(1, "La contraseña es requerida").max(128, "La contraseña es demasiado larga"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    firstName: z.string().trim().min(1, "El nombre es requerido").max(80, "El nombre es demasiado largo"),
    lastName: z.string().trim().min(1, "El apellido es requerido").max(80, "El apellido es demasiado largo"),
    email: z.string().trim().min(1, "El correo es requerido").email("Ingresa un correo válido").max(254, "El correo es demasiado largo"),
    password: z.string().min(10, "La contraseña debe tener al menos 10 caracteres").max(128, "La contraseña es demasiado larga"),
});

export type RegisterForm = z.infer<typeof registerSchema>;


export const profileSchema = z.object({
    firstName: z.string().trim().min(1, "El nombre es requerido").max(80, "El nombre es demasiado largo"),
    lastName: z.string().trim().min(1, "El apellido es requerido").max(80, "El apellido es demasiado largo"),
});

export type ProfileForm = z.infer<typeof profileSchema>;


const currentPasswordField = z.string().min(1, "La contraseña actual es requerida").max(128, "La contraseña es demasiado larga");

export const changeEmailSchema = z.object({
    newEmail: z.string().trim().min(1, "El correo es requerido").email("Ingresa un correo válido").max(254, "El correo es demasiado largo"),
    currentPassword: currentPasswordField,
});

export type ChangeEmailForm = z.infer<typeof changeEmailSchema>;

export const changePasswordSchema = z.object({
    currentPassword: currentPasswordField,
    newPassword: z.string().min(10, "La contraseña debe tener al menos 10 caracteres").max(128, "La contraseña es demasiado larga"),
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const deleteAccountSchema = z.object({
    currentPassword: currentPasswordField,
});

export type DeleteAccountForm = z.infer<typeof deleteAccountSchema>;
