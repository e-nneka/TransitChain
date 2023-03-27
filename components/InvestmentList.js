// Declaring a functional component named InvestmentTable, which accepts props 'investments' and 'withdrawInvestment'
const InvestmentTable = ({ investments, withdrawInvestment }) => {
  // Returning the JSX code that will be rendered on the browser
  return (
    <div>
      {/* Header for the table */}
      <h2 className='max-w-lg my-10 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
        See Your Investments Status
      </h2>
      <div className='overflow-x-auto '>
        <div className='min-w-screen h-auto w-full  flex items-center justify-center bg-gray-100 font-sans overflow-hidden'>
          <div className='w-full lg:w-5/6'>
            {/* Creating a table with a shadow effect */}
            <div className='bg-white rounded-lg shadow-lg'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-2 text-left font-semibold'>Plan</th>
                    <th className='py-3 px-2 text-left font-semibold'>Amount</th>
                    <th className='py-3 px-2 text-center font-semibold'>Current Interest</th>
                    <th className='py-3 px-2 text-center font-semibold'>Days Left</th>
                    <th className='py-3 px-2 text-center font-semibold'>Status</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {investments.length > 0 &&
                    investments.map((user, idx) => (
                      <tr key={idx} className='bg-white'>
                        <td className='py-4 px-6 text-left'>
                          <div className='flex items-center'>
                            <div className='mr-3'>
                              {user.dividendRate === 5 && (
                                <span className='text-green-500 font-medium'>Short Term</span>
                              )}
                              {user.dividendRate === 10 && (
                                <span className='text-green-500 font-medium'>Mid Term</span>
                              )}
                              {user.dividendRate === 15 && (
                                <span className='text-green-500 font-medium'>Long Term</span>
                              )}
                            </div>
                            <div>
                              <p className='text-gray-900 font-medium'>{user.planName}</p>
                              <p className='text-gray-500 text-xs'>{user.planDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 px-6 text-left'>
                          <div className='flex items-center'>
                            <span className='text-gray-900 font-medium'>{user.maticStaked}</span>
                            <span className='text-gray-500 text-xs ml-2'>MATIC</span>
                          </div>
                        </td>
                        <td className='py-4 px-6 text-center'>
                          <span className='text-green-500 font-medium'>{user.maticInterest}%</span>
                        </td>
                        <td className='py-4 px-6 text-center'>
                          <span className='text-gray-900 font-medium'>{user.daysRemaining}</span>
                          <span className='text-gray-500 text-xs ml-2'>days</span>
                        </td>
                        <td className='py-4 px-6 text-center'>
                          {user.open ? (
                            <button onClick={() => withdrawInvestment(user.investmentId)}
                              className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-xs'>
                              Withdraw
                            </button>
                          ) : (
                            <span className='text-gray-500 font-medium'>Withdrawn</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentTable
