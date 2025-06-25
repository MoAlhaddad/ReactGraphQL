require("dotenv").config();
const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { sepolia } = require("viem/chains");
const payrollJson = require("../artifacts/contracts/Payroll.sol/Payroll.json");

async function main() {
  const account = privateKeyToAccount(process.env.NEXT_PRIVATE_PAYROLL_PK);
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.ALCHEMY_SEPOLIA_RPC),
  });

  const { contractAddress } = await client.deployContract({
    abi: payrollJson.abi,
    bytecode: payrollJson.bytecode,
    args: [], // if your constructor needs args, add here
  });

  console.log("Payroll deployed at:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
