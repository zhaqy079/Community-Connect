import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {

  return (

    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">

      <Navigation />

      <main className="w-full max-w-6xl px-8 py-16">

        <Hero />

        <section className="mt-24">

          <Projects />

        </section>

      </main>

      <Footer />

    </div>

  );

}
