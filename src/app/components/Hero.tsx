const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center p-5">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
             Saif Academy
            </h1>
            <p className="text-lg md:text-xl text-white mb-6">
            When teaching is an art, Learning is entertaining
            </p>
            <button className="bg-white text-indigo-600 py-3 px-6 rounded-full text-lg font-bold shadow-md hover:bg-indigo-100 transition duration-300">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/hero.png"
              alt="Online Class"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
