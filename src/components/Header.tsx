import Link from "next/link";
import { FC, ReactNode } from "react";

type HeaderProps = {
  hasButton: boolean;
  onClick: () => void;
  buttonTitle: string;
};

export const Header: FC<HeaderProps> = ({
  hasButton,
  onClick,
  buttonTitle,
}) => {
  return (
    <header className="px-4 lg:px-6 py-4 lg:py-5 bg-gray-600 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white uppercase">
        <Link href={"/"} className="link">
          Lab Report Generator
        </Link>
      </h1>
      {hasButton && (
        <button
          className="bg-gray-400 py-2 px-4 rounded-md hover:bg-gray-300 focus-visible:bg-gray-300 text-gray-800"
          onClick={onClick}
        >
          {buttonTitle}
        </button>
      )}
    </header>
  );
};
