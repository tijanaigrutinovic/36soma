type SiteImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
};

/** Optimized WebP assets from `npm run optimize:images`. */
export function SiteImage({
  src,
  alt,
  width,
  height,
  className,
  loading,
  fetchPriority,
  decoding = "async",
}: SiteImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
    />
  );
}
