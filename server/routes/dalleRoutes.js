import express from "express";
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router(); 

// const configuration = new Configuration({
//     apikey : process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

router.route('/').get((req, res) => {
    res.send('Hello from DALLE-AI');
})

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            model:'dall-e-2',
            prompt: prompt,
            n:1,
            size: '1021x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse?.data?.data[0]?.b64_json;

        res.status(200).json({ photo : image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error?.message);
    }
})
export default router;