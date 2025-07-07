import { Outlet } from "react-router-dom";
import Navbar from "./header/navbar";
import Footer from "./footer";
import ScollBack from "../ScrollBack";
import ChatBot from "../chatbot";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1248px] min-h-[90%] bg-background text-foreground xl:mx-auto">
        <Outlet />
      </main>
      <Footer />
      <ScollBack />
      <ChatBot />
    </>
  );
};

export default Layout;
