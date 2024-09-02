import Image from "next/image";
import heroImg from "/public/hero.png";
import Title from "../Title";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b md:bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center p-5 text-primary-content">
            <Title>Saif Academy</Title>
            <p className="text-lg md:text-xl mb-6">
              When teaching is an art, Learning is entertaining
            </p>
            <button className="btn btn-info">Get Started</button>
          </div>
          <div className="md:w-1/2 pr-5">
            <Image src={heroImg} alt="Online Class" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
