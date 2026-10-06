import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";
import Footer from "@/components/layouts/Footer";
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
