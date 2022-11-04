import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ErrorContext } from "./types/errorContext";

export default function prismaErrorHandler(
  error: Error,
  context: ErrorContext
) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.log(error.message);
    console.log(context);
  }
  return null;
}
