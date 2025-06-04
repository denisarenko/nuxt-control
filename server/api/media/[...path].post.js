import { join } from 'path';
import sharp from 'sharp';

export default defineEventHandler(async (event) => {
  const noAuth = getHeader(event, 'NoAuth');

  if (!event.context?.auth && !noAuth) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { width, height, fit = 'cover' } = getQuery(event);
  const path = getRouterParam(event, 'path');
  const multipartData = await readMultipartFormData(event);

  const results = [];

  for (const media of multipartData) {
    const isImage = media.type.includes('image');

    let fileName = media.filename.replace(/[^\w\s\-.]/g, '').replace(/\s+/g, '-');

    const today = new Date();
    const date = today.toISOString().split('T')[0].split('-').join('');
    const seconds = today.getSeconds();
    const minutes = today.getMinutes();

    const datetime = date + seconds + minutes;

    if (isImage) {
      fileName.replace(/\.[^/.]+$/, '');

      const compress = await sharp(media.data)
        .webp({ quality: 80 })
        .resize(Number(width) || null, Number(height) || null, { fit })
        .toBuffer();

      await useStorage('fs').setItemRaw(`${path}:${datetime}_${fileName}.webp`, compress);

      results.push({
        fileName,
        uploaded: true,
        url: join('/storage', path, `${datetime}_${fileName}.webp`)
      });
    } else {
      await useStorage('fs').setItemRaw(`${path}:${datetime}_${fileName}`, media.data);

      results.push({
        fileName,
        uploaded: true,
        url: join('/storage', path, `${datetime}_${fileName}`)
      });
    }
  }

  return results;
});
