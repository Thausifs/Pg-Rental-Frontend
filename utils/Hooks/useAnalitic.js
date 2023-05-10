import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import listingAPi from "../Api/listing.api";

const useAnalitic = () => {
  const [analitic, setAnalitic] = useState(undefined);
  const { refetch, isLoading } = useQuery({
    queryFn: listingAPi.getAnalitic,
    queryKey: ["getAnalitic"],
    onSuccess: (data) => {
      console.log(data);
      setAnalitic(data);
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { analitic, refetch, isLoading };
};
export default useAnalitic;
