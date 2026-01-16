import Header from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";
import Problems from "@/components/landing_page/Problems";
import Features from "@/components/landing_page/Features";

export default function Home() {
  return (
   <div className="relative w-full overflow-x-hidden min-h-screen">
    <Header />
    <Hero />
    <Problems />
    <Features />
   </div>
  );
}
