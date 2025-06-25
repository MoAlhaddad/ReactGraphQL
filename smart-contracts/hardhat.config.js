require("dotenv").config();
require("@nomicfoundation/hardhat-viem");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.24" },
      { version: "0.8.28" }
    ],
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_RPC,
      accounts: [process.env.NEXT_PRIVATE_PAYROLL_PK],
    },
  },
};
