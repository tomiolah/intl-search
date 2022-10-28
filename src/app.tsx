import React, { useCallback, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { ToastContainer, toast } from "react-toastify";

import { ITranslationFile, useTranslationFile } from "./state";
import useDebounce from "./use-debounce";

export default function App() {
  const { translationFile, setTranslationFile } = useTranslationFile();

  const uploadRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string | undefined>();

  const debouncedQuery = useDebounce(query, 500);

  const entries = useMemo(
    () =>
      translationFile
        ? Object.entries(translationFile).map(([key, value]) => ({
            key,
            value,
          }))
        : undefined,
    [translationFile]
  );

  const fuseInstance = useMemo(
    () => (entries ? new Fuse(entries, { keys: ["key", "value"] }) : undefined),
    [entries]
  );

  const filteredEntries = useMemo(() => {
    if (!entries || !debouncedQuery || !fuseInstance) {
      return undefined;
    }
    return fuseInstance
      .search(debouncedQuery)
      .map((queryResult) => queryResult.item);
  }, [entries, debouncedQuery, fuseInstance]);

  const [selectedItem, setSelectedItem] = useState<
    { key: string; value: string } | undefined
  >();

  const writeToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast(`Text written to clipboard: ${text}`, { type: "info" });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <input
            type="file"
            ref={uploadRef}
            accept="application/json"
            onChange={async (e) => {
              const files = e.target.files;
              if (files?.length !== 1) {
                throw new Error("Please upload 1 file!");
              }
              const file = files[0];
              const textContent = await file.text();
              const parsedText = JSON.parse(textContent) as ITranslationFile;
              setTranslationFile(parsedText);
            }}
          />
          <button
            onClick={() => {
              if (uploadRef.current) {
                uploadRef.current.value = "";
                setTranslationFile(undefined);
              }
            }}
            className="shadow p-1 px-3 rounded-full text-white font-bold bg-red-400"
          >
            X
          </button>
        </div>
        {translationFile ? (
          <div className="shadow border border-gray-300 rounded-xl p-5">
            <div className="flex flex-row justify-between gap-5">
              <input
                type="text"
                placeholder="Search"
                value={query ?? ""}
                onChange={(e) =>
                  setQuery(e.target.value === "" ? undefined : e.target.value)
                }
                className="border border-gray-400 rounded-xl p-2 px-3 bg-gray-100 flex-grow"
              />
              {query ? (
                <button
                  onClick={() => setQuery(undefined)}
                  className="shadow border border-red-400 p-1 px-3 rounded-full text-red-400 font-bold bg-white"
                >
                  X
                </button>
              ) : null}
            </div>
            {filteredEntries?.length ? (
              <div className="mt-5 flex flex-row gap-2">
                <div className="p-2 py-3 rounded-lg border bg-gray-100 w-2/3 flex flex-col gap-2">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.key}
                      onClick={() => {
                        setSelectedItem((item) =>
                          item?.key === entry.key ? undefined : entry
                        );
                      }}
                      className={[
                        " rounded-lg p-1 px-3 hover:bg-white text-xs cursor-pointer",
                        entry.key === selectedItem?.key
                          ? "border-2 border-blue-400 bg-blue-100"
                          : "border border-gray-400",
                      ].join(" ")}
                    >
                      <>
                        <b>{entry.key}</b>
                        <br />
                        {entry.value}
                      </>
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-lg bg-gray-100 border flex-grow flex flex-col text-center gap-1">
                  {selectedItem ? (
                    <>
                      <b>{selectedItem.key}</b>
                      <br />
                      {selectedItem.value}
                      <div className="mt-5 flex flex-row gap-3 justify-between">
                        <button
                          onClick={() => {
                            writeToClipboard(
                              `intl.formatMessage({ id: "${selectedItem.key}", defaultMessage: "${selectedItem.value}" })`
                            );
                          }}
                          className="border shadow p-2 flex-grow font-bold border-gray-400 bg-white rounded-xl"
                        >
                          FMT
                        </button>
                        <button
                          onClick={() => {
                            writeToClipboard(
                              `<FormattedMessage id="${selectedItem.key}" defaultMessage="${selectedItem.value}" />`
                            );
                          }}
                          className="border shadow p-2 flex-grow font-bold border-gray-400 bg-white rounded-xl"
                        >
                          JSX
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
