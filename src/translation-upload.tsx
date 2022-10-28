import { ChangeEvent, useCallback, useRef } from "react";
import { Button } from "./button";
import { useSelectedEntry, useTranslationFile } from "./state";
import { TranslationData } from "./types";

export const TranslationUpload = () => {
  const uploadRef = useRef<HTMLInputElement>(null);

  const { translationFile, setTranslationFile } = useTranslationFile();
  const { setSelectedEntry } = useSelectedEntry();

  const handleUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length !== 1) {
        throw new Error("Please upload 1 file!");
      }
      const file = files[0];
      const textContent = await file.text();
      const parsedText = JSON.parse(textContent) as TranslationData;
      setTranslationFile({
        name: file.name,
        data: parsedText,
      });
    },
    [setTranslationFile]
  );

  return (
    <div className="flex flex-row items-center gap-5">
      <input
        type="file"
        accept=".json"
        ref={uploadRef}
        className="hidden"
        onChange={handleUpload}
      />
      {translationFile ? (
        <>
          <b>{translationFile.name}</b>
          <Button
            color="red"
            onClick={() => {
              if (uploadRef.current) {
                uploadRef.current.value = "";
                setTranslationFile(undefined);
                setSelectedEntry(undefined);
              }
            }}
          >
            X
          </Button>
        </>
      ) : (
        <Button
          color="blue"
          onClick={() => {
            if (uploadRef) {
              uploadRef.current?.click();
            }
          }}
        >
          Upload translation file
        </Button>
      )}
    </div>
  );
};
