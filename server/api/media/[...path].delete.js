export default defineEventHandler(async (event) => {
  if (!event.context?.auth) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const path = getRouterParam(event, 'path');

  await useStorage('fs').removeItem(path.replace('storage/', ''));
});
