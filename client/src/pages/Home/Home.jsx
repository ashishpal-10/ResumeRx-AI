import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero.jsx";
import Trusted from "../../components/Trusted/Trusted";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="relative mx-auto max-w-[1440px] overflow-hidden px-4 pb-24 pt-32 md:px-12">
        {/* Background Glow */}
        <div className="absolute -left-[200px] -top-[100px] -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(128,131,255,0.15)_0%,rgba(13,19,34,0)_70%)]" />

        <div className="absolute -right-[300px] top-[400px] -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(208,188,255,0.1)_0%,rgba(13,19,34,0)_70%)]" />

        <Hero />
        <Trusted />
        <Features />
      </main>

      <Footer />
    </>
  );
};

export default Home;