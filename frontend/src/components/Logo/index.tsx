import { Image } from '../Image';

export type LoginImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Logo({ src, alt, className }: LoginImageProps) {
  return <Image src={src} alt={alt} className={className} />;
}
