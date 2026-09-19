import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ShopFilterControls } from './shop-filter-controls';
import { useGetCategories } from '@/hooks';
import { ShopsPhoneFilterProps } from './shops-phone-filter';

export function ShopFilterContainer({
  handleSearch,
  searchQuery,
  params,
  setParams,
}: ShopsPhoneFilterProps) {
  const { fetchAllCategories, fetchAllCategoriesData } = useGetCategories();
  const categories = fetchAllCategoriesData?.data ?? [];
  return (
    <aside className='hidden lg:block bg-[#f7f7ed]'>
      <div className='sticky top-24 border border-[#004643]/15 bg-[#F0EEDE]/60 p-5'>
        <label className='relative block'>
          <span className='sr-only'>Search products</span>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#004643]/45' />
          <Input
            className='h-10 border-[#004643]/20 bg-transparent pl-10 text-[#004643] placeholder:text-[#004643]/45'
            onChange={(event) => handleSearch(event.target.value)}
            placeholder='Search products'
            value={searchQuery}
          />
        </label>
        <div className='mt-6'>
          <ShopFilterControls
            categories={categories}
            isCategoriesLoading={fetchAllCategories.isLoading}
            params={params}
            setParams={setParams}
          />
        </div>
      </div>
    </aside>
  );
}
