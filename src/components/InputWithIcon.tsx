import { FC, InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
};

const InputWithIcon: FC<InputProps> = ({
  type,
  className,
  children,
  ...rest
}) => {
  return (
    <div className="flex items-center relative">
      <input
        type={type}
        className={twMerge(
          "border-2 border-purple-300 px-2 pr-6 py-1 w-full",
          className
        )}
        {...rest}
      />
      {children}
    </div>
  );
};

export { InputWithIcon };
