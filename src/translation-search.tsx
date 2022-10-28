import { FilterListDisplay } from './filter-list-display';
import { SearchInput } from './search-input';
import { useTranslationFile } from "./state";

export const TranslationSearch = () => {
  const { translationFile } = useTranslationFile();
  return translationFile ? (
    <div className="shadow border border-gray-300 dark:border-none dark:shadow-none rounded-xl p-5">
      <SearchInput />
      <FilterListDisplay />
    </div>
  ) : null;
};
