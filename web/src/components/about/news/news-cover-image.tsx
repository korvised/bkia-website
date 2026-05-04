import Image from "next/image";

interface NewsCoverImageProps {
  src: string;
  alt: string;
}

export function NewsCoverImage({ src, alt }: NewsCoverImageProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
