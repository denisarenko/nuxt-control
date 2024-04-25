export const useValidate = (path = {}, message = {}) => {
  const validate = useState('validate');

  validate.value = {
    [path]: message
  };

  return { validate };
};
