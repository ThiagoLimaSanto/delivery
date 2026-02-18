import type { FieldError } from "react-hook-form";

type FormErrorProps = {
  error?: FieldError;
};

export function FormError({ error }: FormErrorProps) {
  return <>{error && <span className='text-red-600 '>{error.message}</span>}</>;
}
