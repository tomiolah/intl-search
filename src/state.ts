import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type ITranslationFile = Record<string, string>;

export const translationFileAtom = atomWithStorage<
  ITranslationFile | undefined
>('translationFile', undefined);

export const useTranslationFile = () => {
  const [translationFile, setTranslationFile] = useAtom(translationFileAtom);
  return { translationFile, setTranslationFile };
};
