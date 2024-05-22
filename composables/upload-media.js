export const useUploadMedia = async ({ newFile, oldFile = null, directory = '', width = null, height = null }) => {
  if (oldFile) await $fetch(`/api/media/${oldFile}`, { method: 'DELETE' });

  const body = new FormData();

  body.append('media', newFile);

  const params = {};

  if (width && height) {
    params.width = width;
    params.height = height;
  }

  return await $fetch(`/api/media/${directory}`, {
    method: 'POST',
    params,
    body
  }).then((response) => response.url);
};
