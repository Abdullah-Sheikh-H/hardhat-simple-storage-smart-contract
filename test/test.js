const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", async function () {
	let SimpleStorageFactory, simpleStorage
	beforeEach(async function () {
		SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
		simpleStorage = await SimpleStorageFactory.deploy()
	})
	it("fav number should be zero", async function () {
		const currentValue = await simpleStorage.retrieve()
		const expectValue = "0"
		assert.equal(currentValue.toString(), expectValue)
	})
})
