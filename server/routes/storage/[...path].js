export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path');

  const file = await useStorage('fs').getItemRaw(decodeURIComponent(path));

  if (!file) return createError({ statusCode: 404, statusMessage: 'File not found' });

  if (path.endsWith('.pdf')) setResponseHeader(event, 'Content-Type', 'application/pdf');

  return file;
});
