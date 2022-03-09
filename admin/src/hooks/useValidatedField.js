import { useCallback } from "react";
import { useValidatedFormContext } from "./useFormValidations";
import useDebouncedCallback from "./useDebouncedCallback";

const useValidatedField = ({ name, onChange }) => {
  const ctx = useValidatedFormContext();

  const validate = useCallback(
    (value) => {
      ctx?.validateField(name, value);
    },
    [name, ctx?.validateField]
  );

  const debouncedCallback = useDebouncedCallback(validate, 300);

  const handleChange = useCallback(
    (e) => {
      debouncedCallback(e.target.value);
      onChange(e);
    },
    [onChange, debouncedCallback]
  );
  const touched = ctx?.touched?.[name] || false;
  return {
    touched,
    errors: touched ? ctx?.errors?.[name] : [],
    handleChange,
  };
};

export default useValidatedField;
