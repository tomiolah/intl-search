import { ReactNode } from "react";

const COLORS: Record<"blue" | "red" | "light", string> = {
  light:
    "border shadow p-2 flex-grow font-bold border-gray-400 dark:border-slate-900 bg-white dark:bg-slate-900 rounded-xl hover:bg-gray-400 dark:hover:bg-slate-700",
  red: "shadow p-1 px-3 rounded-full text-white font-bold bg-red-400 hover:bg-red-500 hover:shadow-md hover:shadow-red-300",
  blue: "shadow p-1 px-3 rounded-full text-white font-bold bg-blue-400 hover:bg-blue-500",
};

export const Button = ({
  color,
  onClick,
  children,
}: {
  children?: ReactNode;
  onClick?: () => void;
  color: "blue" | "red" | "light";
}) => {
  return (
    <button
      onClick={onClick}
      className={["shadow p-1 px-3 rounded-full", COLORS[color]]
        .filter((classGroup): classGroup is string => !!classGroup)
        .join(" ")}
    >
      {children}
    </button>
  );
};
