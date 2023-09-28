import { LoginCard } from "@/components/LoginForm";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Login | Lab Report Generator</title>
      </Head>

      <main className="flex justify-center min-h-screen items-center">
        <LoginCard />
      </main>
    </>
  );
};

export default Home;
