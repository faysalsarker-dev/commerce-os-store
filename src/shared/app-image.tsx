import Image from "next/image";

export function AppImage({ src, alt, ...props }: React.ComponentProps<typeof Image>) {
  return <Image src={src} alt={alt} {...props} />;
}
