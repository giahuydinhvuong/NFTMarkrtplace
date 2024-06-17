const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  // Wait for deployment to complete before accessing the address
  await nftMarketplace.waitForDeployment();

//   console.log(`Deployed contract address:  ${nftMarketplace.address}`);
console.log("address: ", await nftMarketplace.getAddress() )

  // ... (rest of your code)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});