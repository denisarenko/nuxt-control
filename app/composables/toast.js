export const useToast = (type = '', message = '') => {
  const toastType = useState('toast-type');
  const toastMessage = useState('toast-message');

  toastType.value = type;
  toastMessage.value = message;

  let timeoutId = null;

  const showMessage = () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      toastType.value = null;
      toastMessage.value = null;
    }, 2000);
  };

  const onMouseEnter = () => clearTimeout(timeoutId);

  const onMouseLeave = () => showMessage();

  watch(toastMessage, () => showMessage());

  return {
    toastType,
    toastMessage,
    onMouseEnter,
    onMouseLeave
  };
};
