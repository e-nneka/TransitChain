
export const OWNER_ADDRESS = "0x61158ad9B6eD9BA291a7160ed4ff4bf18C8BB58b"
export const CONTRACT_ADDRESS = "0x93901400b90413a1B647562Faf0107d9684a8012"
export const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "numberOfDays",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "basisPoints",
            "type": "uint256"
          }
        ],
        "name": "adjustInvestmentTimeframe",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentInvestmentId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "investmentId",
            "type": "uint256"
          }
        ],
        "name": "endInvestment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getInvestmentTimeframe",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "stakeholderAddress",
            "type": "address"
          }
        ],
        "name": "getUserAddressInvestmentId",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "numberOfDays",
            "type": "uint256"
          }
        ],
        "name": "getdividendRate",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "numberOfDays",
            "type": "uint256"
          }
        ],
        "name": "invest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "investmentIdsByAddress",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "investmentdividendRates",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "investments",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "investmentId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "stakeholderAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "startDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maturityPeriod",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dividendRate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "investedToken",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "investmentDividend",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "open",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "investmentId",
            "type": "uint256"
          }
        ],
        "name": "retrieveInvestment",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "investmentId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "stakeholderAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "startDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "maturityPeriod",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "dividendRate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "investedToken",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "investmentDividend",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "open",
                "type": "bool"
              }
            ],
            "internalType": "struct TransitChain.Investment",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "investmentId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "newmaturityPeriod",
            "type": "uint256"
          }
        ],
        "name": "setNewmaturityPeriod",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transitChainManager",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]
    
    
