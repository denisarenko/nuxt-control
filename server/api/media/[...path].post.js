import { join } from 'path';
import sharp from 'sharp';

export default defineEventHandler(async (event) => {
  if (!event.context?.auth) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { width, height, fit = 'cover' } = getQuery(event);
  const path = getRouterParam(event, 'path');
  const multipartData = await readMultipartFormData(event);

  const media = multipartData[0];

  // const isPdf = media.type === 'application/pdf';
  const isImage = media.type.includes('image');

  const fileName = media.filename.replace(/[^\w\s\-.]/g, '').replace(/\s+/g, '-');

  if (isImage) {
    fileName.replace(/\.[^/.]+$/, '');

    const today = new Date();
    const date = today.toISOString().split('T')[0].split('-').join('');
    const seconds = today.getSeconds();
    const minutes = today.getMinutes();

    const datetime = date + seconds + minutes;

    const compress = await sharp(media.data)
      .webp({ quality: 80 })
      .resize(Number(width) || null, Number(height) || null, { fit })
      .toBuffer();

    await useStorage('fs').setItemRaw(`${path}:${datetime}_${fileName}.webp`, compress);

    return {
      fileName,
      uploaded: true,
      url: join('/storage', path, `${datetime}_${fileName}.webp`)
    };
  }

  await useStorage('fs').setItemRaw(`${path}:${fileName}`, media.data);

  return {
    fileName,
    uploaded: true,
    url: join('/storage', path, fileName)
  };
});
