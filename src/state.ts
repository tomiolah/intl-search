import Fuse from "fuse.js";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import atomWithDebounce from "./atom-with-debounce";
import { IEntry, ITranslationFile } from "./types";

export const darkModeAtom = atomWithStorage("[intl-translation]-darkMode", true);

export const translationFileAtom = atomWithStorage<
  ITranslationFile | undefined
>("[intl-translation]-translationFile", undefined);

export const entriesAtom = atom((get) => {
  const translationFile = get(translationFileAtom);
  return translationFile
    ? Object.entries(translationFile.data).map(
        ([key, value]) => ({ key, value } as IEntry)
      )
    : undefined;
});

export const filterQueryAtom = atomWithDebounce(
  undefined as string | undefined
);

export const fuseInstanceAtom = atom((get) => {
  const entries = get(entriesAtom);
  return entries ? new Fuse(entries, { keys: ["key", "value"] }) : undefined;
});

export const filteredEntriesAtom = atom((get) => {
  const entries = get(entriesAtom);
  const query = get(filterQueryAtom.debouncedValueAtom);
  const fuseInstance = get(fuseInstanceAtom);
  if (!fuseInstance) {
    return undefined;
  }
  return query
    ? fuseInstance.search(query).map((queryResult) => queryResult.item)
    : entries;
});

export const selectedEntryAtom = atom(undefined as IEntry | undefined);
export const selectedEntryFMTAtom = atom((get) => {
  const entry = get(selectedEntryAtom);
  return entry
    ? `intl.formatMessage({ id: "${entry.key}", defaultMessage: "${entry.value}" })`
    : undefined;
});
export const selectedEntryJSXAtom = atom((get) => {
  const entry = get(selectedEntryAtom);
  return entry
    ? `<FormattedMessage id="${entry.key}" defaultMessage="${entry.value}" />`
    : undefined;
});

export const useTranslationFile = () => {
  const [translationFile, setTranslationFile] = useAtom(translationFileAtom);
  const [entries] = useAtom(entriesAtom);
  return { entries, translationFile, setTranslationFile };
};

export const useFilterQuery = () => {
  const query = useAtomValue(filterQueryAtom.currentValueAtom);
  const setQuery = useSetAtom(filterQueryAtom.debouncedValueAtom);
  const [filteredEntries] = useAtom(filteredEntriesAtom);
  return { filteredEntries, query, setQuery };
};

export const useSelectedEntry = () => {
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);
  const fmt = useAtomValue(selectedEntryFMTAtom);
  const jsx = useAtomValue(selectedEntryJSXAtom);
  return { fmt, jsx, selectedEntry, setSelectedEntry };
};

export const useDarkMode = () => {
  const [isDark, setDark] = useAtom(darkModeAtom);
  return { isDark, setDark };
};
