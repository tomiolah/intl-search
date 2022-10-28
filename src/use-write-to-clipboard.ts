import { useCallback } from "react";
import { toast } from "react-toastify";

export const useWriteToClipboard = () => {
  const writeToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast.info(`Text written to clipboard: ${text}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return writeToClipboard;
};
