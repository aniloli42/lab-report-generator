import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { MdPrint, MdSave } from "react-icons/md";

const className = "text-6xl";

const NavigationSections = [
  {
    text: "Generate Report",
    icon: <MdPrint className={className} />,
    link: "/generate",
  },
  {
    text: "Saved Reports",
    icon: <MdSave className={className} />,
    link: "/saved-reports",
  },
];

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <>
      <Header hasButton buttonTitle="Logout" onClick={handleLogout} />
      <main className="py-6 px-5 flex gap-3.5 items-start flex-wrap">
        {NavigationSections.map(({ icon, text, link }) => (
          <NavigationButton
            link={link}
            ButtonIcon={icon}
            buttonText={text}
            key={text}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

type NavigationButtonProps = {
  buttonText: string;
  ButtonIcon: ReactNode;
  link: string;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  buttonText,
  ButtonIcon,
  link,
}) => {
  return (
    <>
      <Link
        href={link}
        className="bg-gray-600 w-40 h-40 rounded flex flex-col items-center gap-2 px-3 text-lg font-semibold text-gray-200 hover:bg-gray-700 focus-visible:bg-gray-700 text-center"
      >
        <span className="basis-1/2 flex items-end">{ButtonIcon}</span>
        {buttonText}
      </Link>
    </>
  );
};

export default Dashboard;
