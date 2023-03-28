const InvestmentDetailsForm = (props) => {
  const {
    onClose,
    InvestmentDuration,
    InvestmentPercentage,
    setAmount,
    invest,
    refreshInvestmentList,
  } = props;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-700 z-50"
        onClick={props.onClose}
      >
        <div
          className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="md:flex items-center">
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">
                You selected the {InvestmentPercentage}% for {InvestmentDuration} days Plan!
              </p>
              <p className="text-sm text-gray-700 my-8">
                Invest your funds with us for {InvestmentDuration} days
                and enjoy a guaranteed return of {InvestmentPercentage}%.
                We prioritize investor security and offer a full principal
                refund if you withdraw before maturity, with no profit.
                Start investing with us today and watch your funds grow!
              </p>
              <input
                className="appearance-none block w-full bg-[#49897a] text-white border border-[#49897a] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#49897a]"
                id="grid-zip"
                type="text"
                placeholder="0.1 and above"
                onChange={(e) => props.setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center mt-4 md:flex md:justify-center">
            <button
              onClick={() => invest()}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-[#49897a] text-white rounded-lg font-semibold text-sm my-8 md:mt-0 md:order-1 hover:bg-green-700 focus:bg-green-700"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentDetailsForm;
