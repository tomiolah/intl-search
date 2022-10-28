import { Button } from "./button";
import { useFilterQuery, useSelectedEntry } from "./state";
import { strOrUndefined } from "./util";

export const SearchInput = () => {
  const { query, setQuery } = useFilterQuery();
  return (
    <div className="flex flex-row justify-between gap-5">
      <input
        type="text"
        value={query ?? ""}
        placeholder="Search"
        onChange={(e) => setQuery(strOrUndefined(e.target.value))}
        className="border border-gray-400 dark:border-slate-600 rounded-xl p-2 px-3 bg-gray-100 dark:bg-slate-600 flex-grow font-mono focus:outline-0 focus:ring focus:ring-blue-500"
      />
      {query ? (
        <Button color="red" onClick={() => setQuery(undefined)}>
          X
        </Button>
      ) : null}
    </div>
  );
};
