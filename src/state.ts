import { atom, useAtom } from "jotai";

export type ITranslationFile = Record<string, string>;

export const translationFileAtom = atom<ITranslationFile | undefined>(
  undefined
);

export const useTranslationFile = () => {
  const [translationFile, setTranslationFile] = useAtom(translationFileAtom);
  return { translationFile, setTranslationFile };
};
