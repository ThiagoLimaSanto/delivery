type LoginImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Image({ src, alt, className }: LoginImageProps) {
  return <img src={src} alt={alt} className={className} />;
}
