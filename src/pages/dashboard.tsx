import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <>
      <Header hasButton buttonTitle="Logout" onClick={handleLogout} />
      <main></main>
      <Footer />
    </>
  );
};

export default Dashboard;
