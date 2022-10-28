import { Fragment } from "react";
import { Button } from "./button";
import { useSelectedEntry } from "./state";
import { useWriteToClipboard } from "./use-write-to-clipboard";

export const SelectedItemDisplay = () => {
  const { fmt, jsx, selectedEntry } = useSelectedEntry();
  const copy = useWriteToClipboard();
  return (
    <div className="p-5 rounded-lg bg-gray-100 dark:bg-slate-600 border dark:border-slate-600 w-1/3">
      {selectedEntry && fmt && jsx ? (
        <div className="h-full w-full flex items-center text-center">
          <div className="w-full">
            <div className="bg-white dark:bg-slate-800 p-2 shadow outline outline-1 outline-gray-300 dark:outline-slate-700 rounded-md">
              <b className="break-words">
                {selectedEntry.key.split(".").map((part, idx, arr) => (
                  <Fragment key={`${selectedEntry.key}-${part}/${idx}`}>
                    {`${part}${idx < arr.length - 1 ? "." : ""}`}
                    <wbr />
                  </Fragment>
                ))}
              </b>
              <br />
              {selectedEntry.value}
            </div>
            <div className="mt-5 flex flex-row gap-3 justify-between">
              <Button color="light" onClick={() => copy(fmt)}>
                FMT
              </Button>
              <Button color="light" onClick={() => copy(jsx)}>
                JSX
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
