import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  const router = useRouter();

  if (router.pathname.includes("/auth/login")) return children;
  if (router.pathname.includes("/auth/signup")) return children;

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
