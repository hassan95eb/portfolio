import HomeSection from "@/components/HomeSection";
import db from "./db.json";

async function Home() {
  return (
    <div className="font-sans p-8 pb-20 gap-16 sm:p-20 bg-background">
      <section id="#home" className="h-screen">
        <HomeSection data={db.home} />
      </section>
    </div>
  );
}
export default Home;
