import Batch from "./(pages)/batch/Batch";
import HeroSection from "@/components/Hero";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <Batch limit={3} />
    </main>)
}
