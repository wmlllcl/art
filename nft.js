import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");


const provider = new JsonRpcProvider(process.env.RPC);
const signer = await provider.getSigner()

const nft = JSON.parse(fs.readFileSync('./abis/usdt.json'));
const nftContract = new ethers.Contract(process.env.NFT, nft, signer);

export async function balanceOf(address) {
    const result = await nftContract.balanceOf(address);
    return Number(result);
}

export async function tokenOfOwnerByIndex(owner, index) {
    const result = await nftContract.tokenOfOwnerByIndex(owner, index);
    return Number(result);
}

export async function tokenURI(tokenId) {
    const result = await nftContract.tokenURI(tokenId);
    console.log(result);
}

export async function getMetadata(tokenId) {
    const result = await nftContract.tokenURI(tokenId);
    const response = await axios.get(result);
    return {
        title: response.data.title,
        description: response.data.description,
        imageURL: response.data.image,
    }
}