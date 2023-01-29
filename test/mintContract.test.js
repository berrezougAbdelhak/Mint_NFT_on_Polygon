const assert=require("assert");

const Web3=require("web3")

const web3=new Web3("HTTP://127.0.0.1:7545")

const data =require('../build/contracts/mintContract.json')
const abiArray=data.abi;
const contract_address="0x17EAd0340D8dEbbB4f95A07715814C3a8cAF5394"

let accounts;
let art;

beforeEach(async()=>{
    accounts=await web3.eth.getAccounts()
    art=await new web3.eth.Contract(abiArray,contract_address) 
});

describe("mintContract",()=>{

    it("checks the owner",async()=>{
        let owner=await art.methods.owner().call()
        assert.equal(owner,accounts[0])
    })

    it("checks the owner of token 1",async()=>{
        const tokenUri="ABCD";
        await art.methods.mintNft(tokenUri).send({from:accounts[0], gas: '1000000'})
        let owner=await art.methods.ownerOf(1).call()
        assert.equal(owner,accounts[0]);

    })
})