import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/aside";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/news");

  if (router.pathname.includes("/auth/signin")) return children;
  if (router.pathname.includes("/auth/signup")) return children;

  return (
    <>
      <Header />
      {!isDashboard && (
        <div className="bg-white bg-opacity-70">
          <div className="container flex flex-row">
            <Aside />
            {children}
          </div>
        </div>
      )}
      {isDashboard && <div>{children}</div>}
      <Footer />
    </>
  );
}
