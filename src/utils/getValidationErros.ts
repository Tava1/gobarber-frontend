import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // o nome `key` poderia ser qualquer coisa, mas manteremos a semantica
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErros: Errors = {};

  err.inner.forEach(error => {
    if (error.path) validationErros[error.path] = error.message;
  });

  return validationErros;
}
