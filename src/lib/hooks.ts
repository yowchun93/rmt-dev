import { useEffect, useState } from "react";

export function useJobItems(searchText: string) {
  // type the return value of hooks using Generics
  // const [ jobItems, setJobItems ] = useState([]);
  const [ jobItems, setJobItems] = useState<JobItem[]>([])
  const [ isLoading, setIsLoading ] = useState(false);

  const jobItemsSliced = jobItems.slice(0,7)

  useEffect(() => {
    if(!searchText) return

    const response = await () => fetch(
      setIsLoading(true);

    )
  }, [searchText])

  // const fetchData = async () => {
  //   const response = await fetch(

  //   )
  //   const data = await response.json();
  //   setJobItems(data.jobItems);
  // }
  return [ jobItemsSliced, isLoading ] as const; // type return value from Hooks
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleChangeHash = () => {
      const id = window.location.hash.slice(1);
      setActiveId(id);
    }

    handleChangeHash();

    window.addEventListener('hashchange', handleChangeHash);

    return () => {
      window.removeEventListener('hashchange', handleChangeHash)
    }
  }, [])

  return activeId;
}

// export function useJobItem(id: number) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       const response = await fetch(`/api/jobs/${id}`);
//       const data = await response.json();
//       setJobItem(data.jobItem);
//     }

//     fetchData();
//   }, [id])

//   return jobItem;
// }

export function useJobItem(id: number | null) {
  // isInitialLoading
  const { data, isLoading } = useQuery(
    ['jobItem', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    }
  );

  const jobItem = data?.jobItem;
  // return jobItem;
  return { jobItem, isLoading} as const
}

export function useJobItems(id: number | null) {
  const { data, isLoading } = useQuery(['jobItems', id],
    async () => {
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    }
  )
}

const fetchJobItem = async (id: number) => {
  const response = await fetch(`/api/jobs/${id}`);
  const data = await response.json();

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error();
  }

  return data;
}