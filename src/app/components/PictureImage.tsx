import type { ImgHTMLAttributes } from 'react';

type PictureImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  webpSrc: string;
  fallbackSrc: string;
};

export default function PictureImage({
  webpSrc,
  fallbackSrc,
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: PictureImageProps) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={fallbackSrc} alt={alt} loading={loading} decoding={decoding} {...imgProps} />
    </picture>
  );
}
