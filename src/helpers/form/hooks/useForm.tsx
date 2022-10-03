import { ChangeEvent, useEffect, useState } from 'react';

const useForm = <T extends Object>(data?: T) => {
  const [form, setForm] = useState<T>((data || {}) as T);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, maxLength } = e.target;
    let inputValue =
      maxLength !== -1 && typeof value !== 'boolean' && value.length > maxLength
        ? value?.slice(0, maxLength)
        : value;

    setForm({
      ...form,
      [name]: inputValue
    });
  };

  return { form, handleChange, setForm };
};

export default useForm;
