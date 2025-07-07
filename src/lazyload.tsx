import { lazy, Suspense, type ComponentType } from "react";

const LazyLoad = (
  importPath: string,
  fallbackComponent?: ComponentType,
  nameExport: string | null = null
) => {
  const LazyComponent = lazy(async () => {
    const module = await import(/* @vite-ignore */ importPath);
    if (nameExport) {
      return { default: module[nameExport] };
    } else {
      return module;
    }
  });

  const Fallback = fallbackComponent || (() => null);

  return (props: any) => (
    <Suspense fallback={<Fallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyLoad;
