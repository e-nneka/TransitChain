// Importing CONTRACT_ABI and CONTRACT_ADDRESS from contractUtils file
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contract_utils/contractUtils'

// Importing necessary components for the Home page
import InvestmentHeader from '@/components/InvestmentHeader'
import InvestmentPlan from '@/components/InvestmentPlan'
import InvestmentForm from '../components/InvestmentForm'
import InvestmentList from '@/components/InvestmentList'
import Header from '../components/Header'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'

// Importing hooks from react
import { useEffect, useState } from 'react'

// Importing necessary icons from react-icons
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { CgMoveUp } from 'react-icons/cg'
import { FaSortAmountUpAlt } from 'react-icons/fa'

// Importing ethers library for interacting with the Ethereum blockchain
import { ethers } from 'ethers'

const Home = () => {
  // Defining state variables and their initial values using the useState hook
  const [amount, setAmount] = useState(0)
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [Investments, setInvestments] = useState([])
  const [UserAddress, setUserAddress] = useState(null)
  const [InvestmentIds, setInvestmentIds] = useState([])
  const [InvestmentInput, setInvestmentInput] = useState(false)
  const [InvestmentDuration, setInvestmentDuration] = useState(null)
  const [InvestmentPercentage, setInvestmentPercentage] = useState(null)

  // useEffect hook is used to run a function after initial rendering and when the dependencies change.
  useEffect(() => {
    // Defining a function inside useEffect that will run after the component mounts
    const pageReload = async () => {
      // Creating a new instance of Web3Provider and assigning it to the provider state variable
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider) // Creating a new instance of the Contract class and assigning it to the contract state variable
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI)
      setContract(contract)
    }
    // Calling the pageReload function when the component mounts
    pageReload()
  }, []) // Empty dependency array ensures that the function is only run once after the initial rendering of the component.

  // The following function is an asynchronous function that gets the signer, which is used to sign transactions on the Ethereum network.
  const getSigner = async () => {
    try {
      // The provider is used to connect to the Ethereum network.
      // Here, we are calling the 'eth_requestAccounts' method of the provider to request access to the user's Ethereum account.
      await provider.send('eth_requestAccounts', [])
      // The signer is retrieved from the provider.
      const signer = provider.getSigner()
      // The user's wallet address is saved in local storage.
      // This line is currently commented out.
      // localStorage.setItem('walletAddress', accounts[0])
      // The signer is returned.
      return signer
    } catch (error) {
      // If there is an error, it is logged to the console.
      console.error('Error getting signer:', error)
      // A window alert is shown to the user.
      window.alert('Unable to access User')
      // null is returned.
      return null
    }
  }

  // The following function takes in a maturity date and returns the number of days left until that date.
  const daysToMaturity = (maturityPeriod) => {
    // If the maturity date is not a number, an error is logged to the console.
    if (isNaN(maturityPeriod)) {
      console.error('Invalid date:', maturityPeriod)
      // 0 is returned.
      return 0
    }
    // The current time in seconds is divided by 1000 to convert it to milliseconds.
    const currentTime = Date.now() / 1000
    // The number of seconds left until the maturity date is calculated.
    const secondsLeft = maturityPeriod - currentTime
    // The number of days left is calculated and rounded down to the nearest whole number.
    // If the result is negative, 0 is returned instead.
    return Math.max((secondsLeft / 60 / 60 / 24).toFixed(0), 0)
  }

  // The following function takes in a value in wei and returns the equivalent value in ether.
  const convertToEther = (wei) => ethers.utils.formatEther(wei)

  // The following function retrieves the investments made by a user using their investment IDs.
  const getUserInvestments = async (ids, signer) => {
    try {
      // A query is made to the smart contract for each investment ID to retrieve the investment details.
      const passQueryInvestments = await Promise.all(
        ids.map((id) => contract.connect(signer).retrieveInvestment(id))
      )
      // The details of each investment are parsed and saved in an array of objects.
      const parsedInvestments = passQueryInvestments.map((Investment) => ({
        investmentId: Investment.investmentId,
        dividendRate: Number(Investment.dividendRate) / 100,
        daysRemaining: daysToMaturity(Number(Investment.maturityPeriod)),
        etherInterest: convertToEther(Investment.investmentDividend),
        etherStaked: convertToEther(Investment.investedToken),
        open: Investment.open,
      }))
      // The parsed investments are saved using the setInvestments function.
      setInvestments(parsedInvestments)
    } catch (error) {
      // If there is an error, it is logged to the console.
      console.error('Error getting user investments:', error)
      // The error is handled here, such as by displaying an error message to the user.
    }
  }

  // This function is declared with async keyword to enable the use of await inside it.
  // It takes two parameters: address and signer.
  const accessUserInvestmentIds = async (address, signer) => {
    try {
      // This line uses the await keyword to wait for the contract method getUserAddressInvestmentId() to execute.
      // It is called on the contract instance with the signer's credentials.
      // The result of the method call is assigned to the variable InvestmentIds.
      const InvestmentIds = await contract
        .connect(signer)
        .getUserAddressInvestmentId(address)
      // The InvestmentIds variable is returned as the output of the function.
      return InvestmentIds
    } catch (error) {
      // If an error occurs during the execution of the try block, it is caught here.
      // The error message is logged to the console for debugging purposes.
      console.error('Error getting Investment IDs:', error)
      // An empty array is returned as the output of the function in case of an error.
      return []
    }
  }

  // This function is declared with async keyword to enable the use of await inside it.
  const loadUserInvestment = async () => {
    try {
      // The function gets the signer instance by calling getSigner() function, which returns a Promise that resolves to the signer instance.
      // The provider parameter is passed to this function to get the signer instance.
      const signer = await getSigner(provider)
      // The setSigner() function is called to update the state with the signer instance.
      setSigner(signer)
      // The getAddress() function is called on the signer instance to get the user's address.
      const UserAddress = await signer.getAddress()
      // The setUserAddress() function is called to update the state with the user's address.
      setUserAddress(UserAddress)

      // The accessUserInvestmentIds() function is called to get the investment IDs for the user.
      // The UserAddress and signer parameters are passed to this function.
      const InvestmentIds = await accessUserInvestmentIds(UserAddress, signer)
      // The setInvestmentIds() function is called to update the state with the user's investment IDs.
      setInvestmentIds(InvestmentIds)

      // The getUserInvestments() function is called to get the investments for the user.
      // The InvestmentIds and signer parameters are passed to this function.
      getUserInvestments(InvestmentIds, signer)
    } catch (error) {
      // If an error occurs during the execution of the try block, it is caught here.
      // The error message is logged to the console for debugging purposes.
      console.error('Error loading user investment:', error)
    }
  }

  // This function checks if a wallet is connected.
  const walletConnected = () => {
    // If signer is null, it returns false as a wallet is not connected.
    if (signer == null) {
      return false
    }

    // If signer is not an object or does not have the getAddress() function, it returns false as it is an invalid signer instance.
    if (typeof signer !== 'object' || typeof signer.getAddress !== 'function') {
      console.error('Invalid signer:', signer)
      // An alert is displayed to the user to connect a valid wallet.
      window.alert('Invalid Wallet Address, Please connect a valid wallet')
      return false
    }

    // Otherwise, it returns true as the wallet is connected.
    return true
  }

  // This function is called when the user clicks on the Invest button.
  const investButton = (InvestmentDuration, InvestmentPercentage) => {
    // It checks if a wallet is connected by calling the walletConnected() function.
    if (!walletConnected()) {
      console.error('Wallet is not connected.')
      // An alert is displayed to the user to connect the wallet to invest.
      return window.alert('Please Connect Your Wallet to Invest')
    }

    try {
      // The investment input state is set to true.
      setInvestmentInput(true)
      // The investment duration state is set to InvestmentDuration.
      setInvestmentDuration(InvestmentDuration)
      // The investment percentage state is set to InvestmentPercentage.
      setInvestmentPercentage(InvestmentPercentage)
    } catch (error) {
      // If an error occurs during the execution of the try block, it is caught here.
      // The error message is logged to the console for debugging purposes.
      console.error('Error opening staking modal:', error)
    }
  }

  // This function converts an amount in ether to its equivalent value in Wei.
  const convertToWei = (ether) => {
    try {
      return ethers.utils.parseEther(ether)
    } catch (error) {
      console.error('Error converting ether to wei:', error)
      return ethers.constants.Zero
    }
  }

  // This function performs an investment transaction on the contract with the given `signer`.
  const invest = async () => {
    try {
      // Convert `amount` to its equivalent value in Wei.
      const wei = convertToWei(amount)
      // Create the `data` object with the `value` field set to the investment amount in Wei.
      const data = { value: wei }
      // Connect to the contract with the `signer` and call the `invest` function with the investment duration and `data`.
      await contract.connect(signer).invest(InvestmentDuration, data)
    } catch (error) {
      console.error('Error staking ether:', error)
    }
  }

  // This function calls the `endInvestment` function on the contract with the given `investmentId`.
  const withdrawInvestment = async (investmentId) => {
    try {
      // Connect to the contract with the `signer` and call the `endInvestment` function with the `investmentId`.
      await contract.connect(signer).endInvestment(investmentId)
    } catch (error) {
      console.error('Error withdrawing investment:', error)
    }
  }

  return (
    <div className='App text-center'>
      <div>
        {/* Renders the Navbar component, which includes a button to connect a wallet*/}
        <NavBar
          walletConnected={walletConnected}
          connect={loadUserInvestment}
        />
      </div>
      <Header />

      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <InvestmentHeader />
        <div className='grid gap-8 row-gap-0 grid-cols-3'>
        <InvestmentPlan
            icon={FaMoneyCheckAlt}
            plan='SHORT TERM'
            duration='90 DAYS'
            desc='By investing in our platform for a period of three months, you can earn a solid 5% interest rate on your investment.'
            onClick={() => investButton(90, '5%')}
          />

          <InvestmentPlan
            icon={CgMoveUp}
            plan='MID TERM'
            duration='180 DAYS'
            desc='By investing in our platform for a period of six months, you can earn a competitive 10% interest rate, ensuring steady and substantial growth of your investment.'
            onClick={() => investButton(180, '10%')}
          />
          <InvestmentPlan
            icon={FaSortAmountUpAlt}
            plan='LONG TERM'
            duration='365 DAYS'
            desc='By investing in our platform for a period of one year, you can earn an impressive 15% interest rate, providing substantial growth and returns on your investment.'
            onClick={() => investButton(365, '15%')}
          />
        </div>
      </div>
      {/* Renders the InvestmentList component only if there are Investments */}
      {Investments.length > 0 && (
        <InvestmentList
          investments={Investments}
          withdrawInvestment={withdrawInvestment}
        />
      )}
      {/* Renders the InvestmentForm component only if InvestmentInput is true */}
      {InvestmentInput && (
        <InvestmentForm
          onClose={() => setInvestmentInput(false)}
          InvestmentDuration={InvestmentDuration}
          InvestmentPercentage={InvestmentPercentage}
          amount={amount}
          setAmount={setAmount}
          invest={invest}
        />
      )}
      <Footer />
    </div>
  )
}

export default Home
