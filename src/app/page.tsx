import HomeSection from "@/components/HomeSection";
import db from "./db.json";
import AboutSection from "@/components/AboutSection";

async function Home() {
  return (
    <div className="font-sans bg-background">
      <section id="home" className="h-screen">
        <HomeSection data={db.home} />
      </section>
      <section>
        <AboutSection data={db.about} />
      </section>
    </div>
  );
}
export default Home;
