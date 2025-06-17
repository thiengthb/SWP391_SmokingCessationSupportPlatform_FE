import type { FieldError } from "react-hook-form";

interface FormInputErrorProps {
  field?: FieldError | { message?: string };
}

const FormInputError = ({ field }: FormInputErrorProps) => {
  if (!field?.message) return null;

  return <span className="text-sm text-destructive">{field.message}</span>;
};

export default FormInputError;
