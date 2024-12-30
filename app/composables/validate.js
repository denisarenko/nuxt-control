export const useValidate = (path = {}, message = {}) => {
  const validate = useState('control-validate');

  validate.value = {
    [path]: message
  };

  return { validate };
};
