import { useState } from 'react';
import { toast } from 'react-toastify';

export const useFormSubmit = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    validationSchema.validate(values, { abortEarly: false })
      .then(() => {
        toast.success("Form submitted successfully!");
        console.log("Form data:", values);
      })
      .catch((errors) => {
        toast.error("Please correct the errors before submitting!");
        console.error("Validation errors:", errors);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...values, [name]: value});
  };

  return { handleChange, handleSubmit, values };
};
