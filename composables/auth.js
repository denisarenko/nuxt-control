import { useToast } from '~/composables/toast.js';

export const useAuth = () => {
  const account = useState('account', () => {
    return {
      hasAuth: false,
      data: undefined
    };
  });

  const token = useCookie('token');

  if (token.value) {
    const tokenDecoded = JSON.parse(atob(token.value.split('.')[1]));

    account.value.hasAuth = tokenDecoded.status;
    account.value.data = tokenDecoded;
  }

  const login = async (data) => {
    await $fetch('/api/auth/login', { method: 'POST', body: data })
      .then((response) => {
        account.value.hasAuth = true;
        account.value.data = response.user;

        useToast('success', 'You have signed-in');
        navigateTo('/control');
      })
      .catch((error) => useValidate(error.data?.data, error.data?.message));
  };

  const logout = () => {
    account.value.hasAuth = false;
    account.value.data = null;
    token.value = null;

    clearNuxtData();

    navigateTo('/control');
  };

  return {
    account,
    login,
    logout
  };
};
