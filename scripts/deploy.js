const { ethers, run, network } = require("hardhat")
require("@nomiclabs/hardhat-etherscan")

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	)
	console.log("Deploying please wait...")
	const simpleStorage = await SimpleStorageFactory.deploy()
	await simpleStorage.deployed()
	console.log(simpleStorage.address)

	if (network.config.chainId === 4 && process.env.etherscan_apikey) {
		await simpleStorage.deployTransaction.wait(6)
		await verify(simpleStorage.address, [])
	}

	const currentValue = await simpleStorage.retrieve()
	console.log(`currentValue is ${currentValue}`)

	const storeValue = await simpleStorage.store(7)
	await storeValue.wait(1)
	const newValue = await simpleStorage.retrieve()
	console.log(`New value is ${newValue}`)
}

async function verify(contractAddress, args) {
	console.log("Verifying contract...")
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		})
	} catch (e) {
		if (e.message.toLowerCase().includes("already verified")) {
			console.log("Already Verified")
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
