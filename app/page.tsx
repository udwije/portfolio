import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Expertise from "./sections/Expertise";
import Projects from "./sections/Projects";
import Highlights from "./sections/Highlights";
import Terminal from "./sections/Terminal";
import Certs from "./sections/Certs";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import ProgressBar from "./components/ProgressBar";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Expertise />
        <Projects />
        <Highlights />
        <Terminal />
        <Certs />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
