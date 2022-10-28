import { ToastContainer } from "react-toastify";
import { MoonIcon, SunIcon } from "./icons";
import { useDarkMode } from "./state";
import { TranslationSearch } from "./translation-search";
import { TranslationUpload } from "./translation-upload";

export default function App() {
  const { isDark, setDark } = useDarkMode();
  return (
    <div className={`font-sans w-screen h-screen ${isDark ? " dark" : ""}`}>
      <div className="w-full h-full p-5 flex flex-col gap-5 bg-white dark:bg-slate-800 text-black dark:text-white">
        <div className="flex justify-between">
          <TranslationUpload />
          <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
            INTL SEARCH
          </h1>
          <button className="font-bold " onClick={() => setDark(!isDark)}>
            {isDark ? <MoonIcon className="text-amber-400" /> : <SunIcon />}
          </button>
        </div>
        <TranslationSearch />
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
    </div>
  );
}
