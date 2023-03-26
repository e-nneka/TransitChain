// Import the required libraries and contracts
const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('TransitChain contract', function () {
  let transitChain
  let owner
  let investor

  before(async () => {
    // Get the accounts from Hardhat's network
    ;[owner, investor] = await ethers.getSigners()

    // Deploy the TransitChain contract
    const TransitChain = await ethers.getContractFactory('TransitChain')
    transitChain = await TransitChain.deploy({ value: ethers.utils.parseEther('1') })

    // Wait for the contract to be deployed
    await transitChain.deployed()
  })

  it('should allow an investor to invest and get investment details', async () => {
    const transitChain = await TransitChain.deployed()
    const numberOfDays = 10
    const investmentValue = web3.utils.toWei('1', 'ether') // or whatever amount you want to invest
    await transitChain.invest(numberOfDays, {
      value: investmentValue,
      from: accounts[1],
    })
    const investment = await transitChain.getInvestmentDetails(0)
    assert.equal(investment.investor, accounts[1])
    assert.equal(investment.value, investmentValue)
    assert.equal(
      investment.investmentInterest,
      await transitChain.calculateInvestmentInterest(
        lifeTime[numberOfDays],
        investmentValue
      )
    )
  })

  it('should allow the fund manager to modify investment durations', async function () {
    // Call the modifyInvestmentDuration function on the contract
    await transitChain.modifyInvestmentDuration(90, 250)

    // Get the interest rate for a 90-day investment
    const interestRate = await transitChain.getInterestRate(90)

    // Check that the interest rate has been updated
    expect(interestRate).to.equal(250)
  })

  it('should allow an investor to end an investment on maturity and receive the invested tokens plus interest', async function () {
    // Call the invest function on the contract
    await transitChain
      .connect(investor)
      .invest(90, { value: ethers.utils.parseEther('1') })

    // Get the investment IDs for the investor's address
    const investmentIds = await transitChain.investmentIdsByAddress(
      investor.address
    )

    // Call the endInvestmentOnMaturity function on the contract
    const tx = await transitChain
      .connect(investor)
      .endInvestmentOnMaturity(investmentIds[1])

    // Wait for the transaction to be confirmed
    await tx.wait()

    // Check that the investor received the correct amount of tokens
    const balance = await ethers.provider.getBalance(investor.address)
    expect(balance).to.be.closeTo(
      ethers.utils.parseEther('1.002'),
      ethers.utils.parseEther('0.001')
    )
  })
})
