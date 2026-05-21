import { useState, useCallback } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Section from "./components/Section";
import MindmapModal from "./components/MindmapModal";
import TheoryModal from "./components/TheoryModal";
import PracticeModal from "./components/PracticeModal";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import CongratsToast from "./components/CongratsToast";
import { sections } from "./data/content";

export default function App() {
  const [mindmapOpen, setMindmapOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [theorySection, setTheorySection] = useState(null);
  const [practiceSection, setPracticeSection] = useState(null);

  const openTheory = useCallback((section) => {
    setPracticeSection(null);
    setTheorySection(section);
  }, []);

  const openPractice = useCallback((section) => {
    setTheorySection(null);
    setPracticeSection(section);
  }, []);

  const closeTheory = useCallback(() => setTheorySection(null), []);
  const closePractice = useCallback(() => setPracticeSection(null), []);

  // Chuyển trực tiếp từ Theory → Practice (và ngược lại)
  const goToPracticeFromTheory = useCallback(() => {
    const s = theorySection;
    setTheorySection(null);
    setTimeout(() => setPracticeSection(s), 200);
  }, [theorySection]);

  const goToTheoryFromPractice = useCallback(() => {
    const s = practiceSection;
    setPracticeSection(null);
    setTimeout(() => setTheorySection(s), 200);
  }, [practiceSection]);

  return (
    <div className="min-h-screen bg-paper relative">
      <Header onOpenMindmap={() => setMindmapOpen(true)} />
      <main>
        <Hero
          onOpenMindmap={() => setMindmapOpen(true)}
          onOpenChat={() => setChatOpen(true)}
        />
        {sections.map((s, i) => (
          <Section
            key={s.id}
            section={s}
            index={i}
            onOpenTheory={openTheory}
            onOpenPractice={openPractice}
          />
        ))}
      </main>
      <Footer />

      {/* Floating modules */}
      <MindmapModal open={mindmapOpen} onClose={() => setMindmapOpen(false)} />

      <TheoryModal
        open={!!theorySection}
        section={theorySection}
        onClose={closeTheory}
        onGoPractice={goToPracticeFromTheory}
      />

      <PracticeModal
        open={!!practiceSection}
        section={practiceSection}
        onClose={closePractice}
        onGoTheory={goToTheoryFromPractice}
      />

      <Chatbot
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />

      <CongratsToast />
    </div>
  );
}
