import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import { IEntry } from "./types";

export const FilteredItem = ({
  entry, selectedItem, setSelectedItem,
}: {
  entry: IEntry;
  setSelectedItem: Dispatch<SetStateAction<IEntry | undefined>>;
  selectedItem: IEntry | undefined;
}) => {
  return (
    <div
      onClick={() => {
        setSelectedItem((item) => item?.key === entry.key ? undefined : entry
        );
      }}
      className={[
        " rounded-lg p-1 px-3 hover:bg-white hover:dark:bg-blue-400 text-xs cursor-pointer",
        entry.key === selectedItem?.key
          ? "border-2 border-blue-400 bg-blue-100 dark:bg-blue-500"
          : "border border-none",
      ].join(" ")}
    >
      <>
        <b>{entry.key}</b>
        <br />
        {entry.value}
      </>
    </div>
  );
};
