const { ethers } = require('hardhat')
const fs = require('fs')

require('dotenv').config({ path: '.env' })


async function main() {
  const TransitFlow = await ethers.getContractFactory('TransitFlow')

  const transitFlow = await TransitFlow.deploy()

  await transitFlow.deployed()

  console.log('TransitFlow Contract Address:', transitFlow.address)
  console.log('TransitFlow Owner Address:', transitFlow.signer.address)
  

  fs.writeFileSync(
    './contractUtils.js',
    `
    export const OWNER_ADDRESS = "${transitFlow.signer.address}"
    export const CONTRACT_ADDRESS = "${transitFlow.address}"
    `
  )
  
  console.log('Sleeping.....')
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000)

  await hre.run('verify:verify', {
    address: transitFlow.address,
    constructorArguments: [],
  })
 
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
