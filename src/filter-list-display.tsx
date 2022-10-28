import { EntriesList } from "./entries-list";
import { SelectedItemDisplay } from "./selected-item-display";
import { useFilterQuery } from "./state";

export const FilterListDisplay = () => {
  const { filteredEntries } = useFilterQuery();
  return filteredEntries?.length ? (
    <div className="mt-5 flex flex-row gap-2">
      <EntriesList />
      <SelectedItemDisplay />
    </div>
  ) : null;
};
