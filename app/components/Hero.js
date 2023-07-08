const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
              Welcome to My Website
            </h1>
            <p className="text-lg md:text-xl text-white mb-6">
              Discover the amazing features and services I offer.
            </p>
            <button className="bg-white text-indigo-600 py-3 px-6 rounded-full text-lg font-bold shadow-md hover:bg-indigo-100 transition duration-300">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/illustration.svg"
              alt="Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
