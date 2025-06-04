export const useUploadMedia = async ({
  newFile,
  oldFile = null,
  directory = '',
  width = null,
  height = null,
  fit = null,
  noAuth = false
}) => {
  if (oldFile) await $fetch(`/api/media/${oldFile}`, { method: 'DELETE' });

  const body = new FormData();

  if (Array.isArray(newFile)) {
    newFile.forEach((file) => body.append('media', file));
  } else {
    body.append('media', newFile);
  }

  const params = {};

  if (width && height) {
    params.width = width;
    params.height = height;
  }

  if (fit) params.fit = fit;

  const response = await $fetch(`/api/media/${directory}`, {
    method: 'POST',
    params,
    body,
    ...(noAuth && { headers: { NoAuth: noAuth } })
  });

  const urls = response.map((result) => result.url);

  if (urls.length === 1) return urls[0];

  return urls.join(', ');
};

export const useDeleteMedia = async (path) => {
  if (path) {
    await $fetch(`/api/media/${path}`, { method: 'DELETE' });
  }
};
