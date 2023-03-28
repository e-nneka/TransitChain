/* Importing CONTRACT_ABI and CONTRACT_ADDRESS from contractUtils file,
importing icons, hoks and all the neccessary components */
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contract_utils/contractUtils'

import { FaMoneyCheckAlt } from 'react-icons/fa'
import { CgMoveUp } from 'react-icons/cg'
import { FaSortAmountUpAlt } from 'react-icons/fa'

import InvestmentHeader from '@/components/InvestmentHeading'
import InvestmentPlan from '@/components/InvestmentDetails'
import InvestmentForm from '../components/InvestmentDetailsForm'
import InvestmentList from '@/components/InvestmentInventory'
import Header from '../components/Header'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const Home = () => {
  // Initializing state variables
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

  /*This code uses the useEffect hook to run a function after the component has mounted.
  The function creates a new instance of the Web3Provider and Contract classes,
  and assigns them to the provider and contract state variables.*/
  useEffect(() => {
    
    const pageReload = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider) 
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI)
      setContract(contract)
    }
    pageReload()
  }, [])

  /*This function retrieves the signer object from the provider and returns it if successful,
  and logs an error message and returns null if unsuccessful. It also requests access to the user's
  Ethereum account using the eth_requestAccounts method provided by the provider. */
  const getSigner = async () => {
    try {
      
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      return signer
    } catch (error) {
      
      console.error('Error getting signer:', error)
      window.alert('Unable to access User')

      return null
    }
  }

  /*This function checks if a wallet is connected and returns a boolean value.
  If the signer is null or an invalid object, it logs an error message and returns false.
  If the signer is a valid object, it returns true.*/
  const walletConnected = () => {
  
    if (signer == null) {
      return false
    }

    if (typeof signer !== 'object' || typeof signer.getAddress !== 'function') {
      console.error('Invalid signer:', signer)
   
      window.alert('Invalid Wallet Address, Please connect a valid wallet')
      return false
    }

    return true
  }

  // This function is called when the user clicks on the Invest button.
  const investButton = (InvestmentDuration, InvestmentPercentage) => {
   
    if (!walletConnected()) {
      console.error('Wallet is not connected.')
   
      return window.alert('Please Connect Your Wallet to Invest')
    }

    try {
     
      setInvestmentInput(true)
  
      setInvestmentDuration(InvestmentDuration)
    
      setInvestmentPercentage(InvestmentPercentage)
    } catch (error) {
 
      console.error('Error opening staking modal:', error)
    }
  }

  
 // This function converts a value given in wei, which is the smallest unit of ether, into ether.
 const convertToEther = (wei) => ethers.utils.formatEther(wei)

 // This function takes a value in ether and converts it to wei (the smallest unit of ether)
 const convertToWei = (ether) => {
   try {
     return ethers.utils.parseEther(ether)
   } catch (error) {
     console.error('Error converting ether to wei:', error)
     return ethers.constants.Zero
   }
 }

 // This function allows the user to invest a certain amount of ether for a specified duration.
 const invest = async () => {
   try {
     const wei = convertToWei(amount)
     const data = { value: wei }

     await contract.connect(signer).invest(InvestmentDuration, data)
   } catch (error) {
     console.error('Error staking ether:', error)
   }
 }

  /*This function retrieves a user's investment IDs from the contract by connecting to it using
  the provided signer. If successful, it returns the investment IDs, otherwise it logs an error
  message and returns an empty array.*/
  const accessUserInvestmentIds = async (address, signer) => {
    try {

      const InvestmentIds = await contract
        .connect(signer)
        .getUserAddressInvestmentId(address)
      return InvestmentIds
    } catch (error) {
 
      console.error('Error getting Investment IDs:', error)
     
      return []
    }
  }

  /* This function calculates the number of days left until the maturity period, given the
  maturity period in Unix time. If the input is not a valid date, it logs an error and returns 0.*/
  const daysToMaturity = (maturityPeriod) => {
    if (isNaN(maturityPeriod)) {
      console.error('Invalid date:', maturityPeriod)  
      return 0
    }
    const currentTime = Date.now() / 1000
    const secondsLeft = maturityPeriod - currentTime
    return Math.max((secondsLeft / 60 / 60 / 24).toFixed(0), 0)
  }

  /*This function retrieves the investments made by a user based on a list of investment IDs and
  a signer object. It retrieves the investment details using the retrieveInvestment method of
  the contract, parses the retrieved information and stores it in state.*/ 
  const getUserInvestments = async (ids, signer) => {
    try {
      const passQueryInvestments = await Promise.all(
        ids.map((id) => contract.connect(signer).retrieveInvestment(id))
      )
      const parsedInvestments = passQueryInvestments.map((Investment) => ({
        investmentId: Investment.investmentId,
        dividendRate: Number(Investment.dividendRate) / 100,
        daysRemaining: daysToMaturity(Number(Investment.maturityPeriod)),
        etherInterest: convertToEther(Investment.investmentDividend),
        etherStaked: convertToEther(Investment.investedToken),
        open: Investment.open,
      }))
      setInvestments(parsedInvestments)
    } catch (error) {
      console.error('Error getting user investments:', error)
    }
  }

  /*This function loads a user's investment data by getting their signer address,
  retrieving their investment IDs, and then calling another function to get their
  investment details. If an error occurs, it logs an error message.*/
  const loadUserInvestment = async () => {
    try {
  
      const signer = await getSigner(provider)
      setSigner(signer)
  
      const UserAddress = await signer.getAddress()
      setUserAddress(UserAddress)

      const InvestmentIds = await accessUserInvestmentIds(UserAddress, signer)
      setInvestmentIds(InvestmentIds)

      getUserInvestments(InvestmentIds, signer)
    } catch (error) {

      console.error('Error loading user investment:', error)
    }
  }

  //This function withdraws an investment by calling the endInvestment function on the contract using the signer object 
  const withdrawInvestment = async (investmentId) => {
    try {
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
