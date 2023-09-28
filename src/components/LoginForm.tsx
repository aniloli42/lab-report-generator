import { InputWithIcon } from "@/components/InputWithIcon";
import { BsLockFill, BsPersonFill } from "react-icons/bs";

export const LoginCard = () => {
  return (
    <div className=" rounded overflow-hidden sm:min-w-[27rem] bg-white">
      <h1 className="px-4 py-4 bg-purple-900 text-white font-bold text-lg">
        Lab Report Generator
      </h1>

      <form className="flex gap-6 flex-col px-8 py-10">
        <InputWithIcon type="text" placeholder="Username">
          <BsPersonFill className="text-xl text-purple-400 absolute right-1" />
        </InputWithIcon>

        <InputWithIcon type="password" placeholder="Password">
          <BsLockFill className="text-xl text-purple-400 absolute right-1" />
        </InputWithIcon>

        <button
          type="submit"
          className="bg-purple-900 px-4 py-1 rounded text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
