import { Image } from '../Image';

export type LoginImageProps = {
  src: string;
  alt: string;
};

export function Logo({ src, alt }: LoginImageProps) {
  return <Image src={src} alt={alt} className='w-90 mb-20 lg:w-[70%]' />;
}
