const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('TransitFlow contract', function () {
  let transitFlow
  let owner
  let investor

  before(async () => {
  
    ;[owner, investor] = await ethers.getSigners()

    const TransitFlow = await ethers.getContractFactory('TransitFlow')
    transitFlow = await TransitFlow.deploy({ value: ethers.utils.parseEther('1') })

    await transitFlow.deployed()
  })

  it('should allow an investor to invest and get investment details', async () => {
    const transitFlow = await TransitFlow.deployed()
    const numberOfDays = 10
    const investmentValue = web3.utils.toWei('1', 'ether') 
    await transitFlow.invest(numberOfDays, {
      value: investmentValue,
      from: accounts[1],
    })
    const investment = await transitFlow.getInvestmentDetails(0)
    assert.equal(investment.investor, accounts[1])
    assert.equal(investment.value, investmentValue)
    assert.equal(
      investment.investmentInterest,
      await transitFlow.calculateInvestmentInterest(
        lifeTime[numberOfDays],
        investmentValue
      )
    )
  })

  it('should allow the fund manager to modify investment durations', async function () {
    
    await TransitFlow.modifyInvestmentDuration(90, 250)

    const interestRate = await TransitFlow.getInterestRate(90)

    expect(interestRate).to.equal(250)
  })

  it('should allow an investor to end an investment on maturity and receive the invested tokens plus interest', async function () {
    
    await transitFlow
      .connect(investor)
      .invest(90, { value: ethers.utils.parseEther('1') })

    const investmentIds = await transitFlow.investmentIdsByAddress(
      investor.address
    )

    const tx = await transitFlow
      .connect(investor)
      .endInvestmentOnMaturity(investmentIds[1])

    await tx.wait()

    // Check that the investor received the correct amount of tokens
    const balance = await ethers.provider.getBalance(investor.address)
    expect(balance).to.be.closeTo(
      ethers.utils.parseEther('1.002'),
      ethers.utils.parseEther('0.001')
    )
  })
})
