import { useState, useEffect } from "react";

type ImageSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface ImageDimension {
  width: number;
  height: number;
}

const SIZE_MAP: Record<ImageSize, ImageDimension> = {
  "sm": { width: 100, height: 100 },
  "md": { width: 150, height: 150 },
  "lg": { width: 200, height: 200 },
  "xl": { width: 250, height: 250 },
  "2xl": { width: 300, height: 300 },
};

const useImageDimension = (size: ImageSize): ImageDimension => {
  const [dimensions, setDimensions] = useState<ImageDimension>({ width: 0, height: 0 });

  useEffect(() => {
    const dimensions = SIZE_MAP[size] || SIZE_MAP.md;
    setDimensions(dimensions);
  }, [size]);

  return dimensions;
};

export default useImageDimension;
