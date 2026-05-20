import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Section from "./components/Section";
import MindmapModal from "./components/MindmapModal";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import { sections } from "./data/content";

export default function App() {
  const [mindmapOpen, setMindmapOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper relative">
      <Header onOpenMindmap={() => setMindmapOpen(true)} />
      <main>
        <Hero
          onOpenMindmap={() => setMindmapOpen(true)}
          onOpenChat={() => setChatOpen(true)}
        />
        {sections.map((s, i) => (
          <Section key={s.id} section={s} index={i} />
        ))}
      </main>
      <Footer />

      {/* Floating modules */}
      <MindmapModal open={mindmapOpen} onClose={() => setMindmapOpen(false)} />
      <Chatbot
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
