import { Domains } from "@/constants/domain";
import counterService from "@/services/api/counter.service";
import useSWR from "swr";

export const useCounterSwr = () => {
  const { data, error, isLoading } = useSWR(
    Domains.COUNTER,
    () => counterService.getCounter(),
  );

  return {
    counter: data,
    isLoading,
    error,
  };
}