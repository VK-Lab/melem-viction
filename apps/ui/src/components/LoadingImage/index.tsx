import Image, { ImageProps } from 'next/image';

type LoadingImageProps = Omit<ImageProps, 'src'> &
  Partial<Pick<ImageProps, 'src'>>;

const LoadingImage = ({ src, ...restProps }: LoadingImageProps) => {
  if (!src) {
    // TODO: Add not found image.
    return null;
  }

  // TODO: Config loading image later.

  return <Image src={src} {...restProps} />;
};

export default LoadingImage;
