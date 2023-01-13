require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/blockNumber")
require("hardhat-gas-reporter")
require("solidity-coverage")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const rinkeby_rpc_url = process.env.rinkeby_rpc_url || "rpc"
const private_key = process.env.private_key || "key"
const etherscan_apikey = process.env.etherscan_apikey || "apikey"
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: rinkeby_rpc_url,
			accounts: [private_key],
			chainId: 4,
		},
	},
	solidity: "0.8.8",

	etherscan: {
		apiKey: etherscan_apikey,
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
	},
}
