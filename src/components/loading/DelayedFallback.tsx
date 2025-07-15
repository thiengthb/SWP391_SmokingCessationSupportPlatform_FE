import { useEffect, useState } from "react";

interface Props {
  fallback: React.ReactNode;
  delay?: number; // default: 300ms
}

const DelayedFallback = ({ fallback, delay = 300 }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? fallback : null;
};

export default DelayedFallback;
