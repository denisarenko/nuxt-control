export default defineEventHandler(async (event) => {
  const noAuth = getHeader(event, 'NoAuth');

  if (!event.context?.auth && !noAuth) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const path = getRouterParam(event, 'path');

  await useStorage('fs').removeItem(path.replace('storage/', ''));
});
