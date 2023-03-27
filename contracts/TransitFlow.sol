// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract TransitFlow {
    // Declare a public variable to store the contract creator's address
    address public transitFlowManager;

    // Define a struct to represent an investment made in the TransitChain
    struct Investment {
        uint256 investmentId; // Unique ID for the investment
        address stakeholderAddress; // Address of the investor
        uint256 startDate; // Timestamp of when the investment was made
        uint256 maturityPeriod; // Duration of the investment, in days
        uint256 dividendRate; // Annual percentage rate (APR) of the investment
        uint256 investedToken; // Amount invested by the investor, in tokens
        uint256 investmentDividend; // Dividend earned by the investor, in tokens
        bool open; // Flag indicating if the investment is still active
    }

    // Declare a variable of type Investment to store the current investment
    Investment investment;

    // Declare a public variable to keep track of the current investment ID
    uint256 public currentInvestmentId;
    // Declare an array to store investment durations in days
    uint256[] investmentDuration;

    // Declare a mapping to store Investment structs, indexed by an integer ID
    mapping(uint256 => Investment) public investments;

    // Declare a mapping to store arrays of investment IDs for each investor address
    mapping(address => uint256[]) public investmentIdsByAddress;

    // Declare a mapping to store dividend rates, indexed by investment duration in days
    mapping(uint256 => uint256) public investmentdividendRates;

    // Constructor function that runs when the contract is deployed
    constructor() payable {
        // Set the address of the contract deployer as the transit chain manager
        transitFlowManager = msg.sender;

        // Set the currentInvestmentId to 0
        currentInvestmentId = 0;

        // Set dividend rates for different investment durations
        investmentdividendRates[90] = 500; // 500 basis points (5%)
        investmentdividendRates[180] = 1000; // 1000 basis points (10%)
        investmentdividendRates[365] = 1500; // 1500 basis points (15%)

        // Add the investment durations to the investmentDuration array
        investmentDuration.push(90);
        investmentDuration.push(180);
        investmentDuration.push(365);
    }

    // Allows an investor to make an investment with a specified duration in days
    function invest(uint256 numberOfDays) external payable {
        // Require that the dividend rate for the specified duration is greater than 0
        require( investmentdividendRates[numberOfDays] > 0, "No Investment Duration" );
        // Create a new Investment struct and add it to the investments mapping
        investments[currentInvestmentId] = Investment(
            currentInvestmentId,
            msg.sender,
            block.timestamp, // Start time of the investment
            block.timestamp + (numberOfDays * 1 days), // End time of the investment
            investmentdividendRates[numberOfDays], // Dividend rate for the investment duration
            msg.value, // Amount invested
            computeInvestmentReturns( investmentdividendRates[numberOfDays], msg.value ), // Returns on the investment
            true
        );
            // Add the new investment ID to the array of investments for the investor's address
            investmentIdsByAddress[msg.sender].push(currentInvestmentId);
            // Increment the investment ID counter
            currentInvestmentId += 1;
    }

    // This function returns an array of investment durations in days
    function getInvestmentTimeframe() external view returns (uint256[] memory) {
        return investmentDuration;
    }

    // This function allows the TransitChain Manager to adjust the investment timeframe
    // by specifying the number of days and the dividend rate in basis points.
    function adjustInvestmentTimeframe(uint256 numberOfDays, uint256 basisPoints) external {
        require(transitFlowManager == msg.sender, "Only TransitChain Manager can adjust Investment Duration" );
        investmentdividendRates[numberOfDays] = basisPoints;
        investmentDuration.push(numberOfDays);
    }

    // This function takes in an Ethereum address and returns an array of investment IDs associated with that address.
    function getUserAddressInvestmentId(address stakeholderAddress) external view returns (uint256[] memory) {
        return investmentIdsByAddress[stakeholderAddress];
    }

    // This function takes in a basis point value and an amount in Wei, and calculates the total interest
    function computeInvestmentReturns(uint256 basisPoints, uint256 amountInWei) private pure returns (uint256){
        require(amountInWei > 0, "Invalid amount");
        uint256 totalInterest = (basisPoints * amountInWei) / 10000;
        return totalInterest;
    }

    //This function retrieves the investmentby Id and returns it as a memory struct
    function retrieveInvestment(uint256 investmentId) external view returns (Investment memory) {
        return investments[investmentId];
    }

    // The function sets a new maturity period for a specific investment Id
    function setNewmaturityPeriod(uint256 investmentId, uint256 newmaturityPeriod) external {

    // Check that the caller is the TransitChain Manager
    require(transitFlowManager == msg.sender, "Only TransitChain Manager can adjust unlock dates" );

    // Check that the investment is still open
    require(investments[investmentId].open == true, "Investment is closed");

    // Check that the new maturity period is after the current maturity period
    require(newmaturityPeriod > investments[investmentId].maturityPeriod,"New unlock date must be after the current unlock date");

    // Set the new maturity period for the investment
    investments[investmentId].maturityPeriod = newmaturityPeriod;
    }
    // Modifier to check that an address is not empty
    modifier onlyNonEmptyAddress(address addr) {
        require(addr != address(0), "Leaving the address empty is not allowed");
        _;
    }

    // This function takes in the number of days and returns the dividend rate for investments of that duration.
    function getdividendRate(uint256 numberOfDays) external view returns (uint256){
        return investmentdividendRates[numberOfDays];
    }

    // This function ends an investment and withdraw funds
    function endInvestment(uint256 investmentId) external onlyNonEmptyAddress(msg.sender) {
        require(investments[investmentId].stakeholderAddress == msg.sender, "The only person authorized to make changes to the investment is the creator");
        require(investments[investmentId].open == true, "Investment is closed");
        investments[investmentId].open = false;
        uint256 totalAmount = 0;

        // Check if the investment has matured
        if (block.timestamp > investments[investmentId].maturityPeriod) {
            // If the investment has matured, add the dividend to the total amount
            totalAmount =
                investments[investmentId].investedToken +
                investments[investmentId].investmentDividend;
        } else {
            // If the investment has not matured, only add the invested token amount to the total amount
            totalAmount = investments[investmentId].investedToken;
        }

        // Reset the invested token and investment dividend amounts to zero
        investments[investmentId].investedToken = 0;
        investments[investmentId].investmentDividend = 0;

        // Check that the total amount is greater than zero
        require(totalAmount > 0, "No investment has been made");

        // Transfer the total amount to the stakeholder's address
        (bool success, ) = payable(msg.sender).call{value: totalAmount}("");
        require(success, "The attempt to transfer ether was unsuccessful.");
    }
}
