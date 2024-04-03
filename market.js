import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");

const provider = new JsonRpcProvider(process.env.RPC);
const signer = await provider.getSigner();

const MymarketAbi = JSON.parse(fs.readFileSync('./abis/market.json'));
const MymarketContract = new ethers.Contract(process.env.MARKET, MymarketAbi, signer);

export async function buy(tokenId) {
    const result = await MymarketContract.buy(tokenId);
    console.log('buy', result.hash);
}

export async function changePrice(tokenId, price) {
  const result = await MymarketContract.changePrice(tokenId, price);
  console.log('change price', result.hash);
}

export async function cancelOrder(tokenId) {
  const result = await MymarketContract.cancelOrder(tokenId);
  console.log('cancel order', result.hash);
}

export async function getAllNFTs() {
  const result = await MymarketContract.getAllNFTs();
  console.log(result);
}

export async function getMyNFTs() {
  const result = await MymarketContract.getMyNFTs();
  console.log(result);
}

export async function getOrder(tokenId) {
  const result = await MymarketContract.orderOfId(tokenId);
  return {
    seller: result[0],
    tokenId: Number(result[1]),
    price: Number(result[2]) / 1e18,
  }
}

