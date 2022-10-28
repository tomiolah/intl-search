export type TranslationData = Record<string, string>;

export type ITranslationFile = {
  name: string;
  data: TranslationData;
}

export interface IEntry { key: string; value: string }