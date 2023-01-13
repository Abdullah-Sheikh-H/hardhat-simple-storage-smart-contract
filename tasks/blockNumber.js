const { task } = require("hardhat/config")

task("blockNumber", "gives current Block number").setAction(
	async (taskArgs, hre) => {
		const blockNumber = await hre.ethers.provider.getBlockNumber()
		console.log(blockNumber)
	}
)
module.exports = {}
