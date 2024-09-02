import Batch from "./(pages)/batches/Batch";
import HeroSection from "@/components/Home/Hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Batch limit={3} />
    </main>
  );
}
