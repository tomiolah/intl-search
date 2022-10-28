import { FilteredItem } from './filtered-item';
import { useFilterQuery, useSelectedEntry } from "./state";

export const EntriesList = () => {
  const { filteredEntries } = useFilterQuery();
  const { selectedEntry, setSelectedEntry } = useSelectedEntry();
  return (
    <div className="p-3 rounded-lg border dark:border-slate-700 bg-gray-100 dark:bg-slate-600 w-2/3 flex flex-col gap-2 max-h-[77vh] overflow-y-auto">
      {filteredEntries?.map((entry) => (
        <FilteredItem
          entry={entry}
          key={entry.key}
          selectedItem={selectedEntry}
          setSelectedItem={setSelectedEntry} />
      ))}
    </div>
  );
};
