import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");

const provider = new JsonRpcProvider(process.env.RPC);
const signer = await provider.getSigner();

const MyauctionAbi = JSON.parse(fs.readFileSync('./abis/market.json'));
const MyauctionContract = new ethers.Contract(process.env.AUCTION, MyauctionAbi, signer);

export async function placeBid(_artId,_bidAmount){
    const result = await MyauctionContract.placeBid(_artId,_bidAmount);
    console.log('placeBid', result.hash);
}

export async function finalizeAuction(_artId){
    const result = await MyauctionContract.placeBid(_artId);
    console.log('complete', result.hash);
}