import { lazy, Suspense, type ComponentType } from "react";
import Spinner from "./components/loading/Spinner";
import DelayedFallback from "./components/loading/DelayedFallback";

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

  const Fallback = fallbackComponent || Spinner;

  return (props: any) => (
    <Suspense fallback={<DelayedFallback fallback={<Fallback />} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyLoad;
