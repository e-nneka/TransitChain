const InvestmentDetails = ({ icon, onClick, plan, duration, desc }) => {
  const Icon = icon;

  return (
    <div className="relative text-center">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 sm:w-20 sm:h-20">
        <svg className="w-12 h-12 text-green-500 sm:w-16 sm:h-16" stroke="currentColor" viewBox="0 0 52 52">
          <Icon size={50} className="text-[#49897a]" />
        </svg>
      </div>
      <h6 className="mb-2 text-2xl font-extrabold">{plan}</h6>
      <h6 className="mb-2 text-2xl font-normal">{duration}</h6>
      <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">{desc}</p>
      <div className="flex items-center justify-center h-10">
        <button
          onClick={onClick}
          aria-label=""
          className="inline-flex items-center justify-center font-semibold transition-colors duration-200 bg-[#49897a] text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
        >
          Invest Now
        </button>
      </div>
      <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
        <svg
          className="w-8 text-gray-700 transform rotate-90 lg:rotate-0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        ></svg>
      </div>
    </div>
  );
};

export default InvestmentDetails;
