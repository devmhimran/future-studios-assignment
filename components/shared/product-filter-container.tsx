import { Dispatch, SetStateAction } from 'react';

interface ParamsProps {
  search: string;
  page: string;
  category: string;
}

interface ProductFilterContainerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  params: ParamsProps;
  setParams: Dispatch<SetStateAction<ParamsProps>>;
  debounced: (value: string) => void;
}

export function ProductFilterContainer({
  searchQuery,
  setSearchQuery,
  params,
  setParams,
  debounced,
}: ProductFilterContainerProps) {
  return <div>product-filter-container</div>;
}
