import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { addFileToIPFS, addJSONToIPFS } from './ipfs-uploader.js';
import { mint } from './nft-minter.js';
import dotenv from 'dotenv';
dotenv.config("./.env");

const app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.get('/', (req,res) => {
    res.render('home')
})

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const file = req.files.file;
    const fileName = file.name
    const filePath = 'files/' + fileName

    const title = req.body.title
    const description = req.body.description

    file.mv(filePath, async (err) => {
        if (err) {
            console.log('error: failed to download the file.')
            return res.status(500).send(err)
        }

        const fileResult = await addFileToIPFS(filePath)
        console.log('File added to IPFS:', fileResult.cid.toString());

        const metadata = {
            title,
            description,
            image: 'https://ipfs.io/ipfs' + fileResult.cid.toString()
        }
        const jsonResult = await addJSONToIPFS(metadata)
        console.log('Metadata added to IPFS:', jsonResult.cid.toString());

        await mint(process.env.ADDRESS, 'https://ipfs.io/ipfs' + jsonResult.cid.toString())

        res.json({ 
            message: 'File uploaded successfully.', 
            metadata
        });
    });
});

const HOST = process.env.HOST 
const PORT = process.env.PORT

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`)
})