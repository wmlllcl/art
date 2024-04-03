import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");


const provider = new JsonRpcProvider(process.env.RPC);
const signer = await provider.getSigner()

const usdt = JSON.parse(fs.readFileSync('./abis/usdt.json'));
const USDTContract = new ethers.Contract(process.env.USDT, usdt, signer);

export async function approve(spender, amount) {
  const result = await USDTContract.approve(spender, amount);
  console.log(result.hash);
}

export async function getAllowance(owner, spender) {
  const result = await USDTContract.allowance(owner, spender);
  return Number(result);
}