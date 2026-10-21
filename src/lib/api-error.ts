import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown) {
  if (!isAxiosError(error)) return "Ocurrió un error inesperado";
  if (!error.response) return "No se pudo conectar con el servidor";

  const message = error.response.data?.message;
  if (Array.isArray(message)) return message.join(". ");
  return typeof message === "string" ? message : "Ocurrió un error inesperado";
}
