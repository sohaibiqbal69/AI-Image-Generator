// THIRD ITERATION OF THE CODE
import express from 'express';
import OpenAI from 'openai'; // Ensure you import OpenAI properly

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Handle POST requests
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Validate the prompt
        if (!prompt) {
            return res.status(400).send("Prompt is required.");
        }

        // Use the correct function to generate an image
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url' // Change to 'url' if you want the image URL
        });

        // Depending on the response structure, adjust accordingly
        const imageUrl = aiResponse.data[0].url; // or use aiResponse.data.data[0].url depending on your version

        // Send back the image URL
        res.status(200).json({ photo: imageUrl });
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Enhanced error handling
        if (error.response) {
            return res.status(error.response.status).send(error.response.data.error.message || 'An error occurred');
        }

        res.status(500).send('An unexpected error occurred: ' + error.message);
    }
});

// Handle GET requests
router.route('/').get((req, res) => {
    res.send("DALL-E API is running. Please use POST to submit prompts.");
});

export default router;



// REVISED CODE (NOT WORKING)

// import express, { response } from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// // Handle POST requests (the existing code)
// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.images.generate({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//         });



        

//         // const aiResponse = await openai.createImage({f
//         //     prompt,f
//         //     n: 1,f
//         //     size: '1024x1024',f
//         //     response_format: 'b64.json',f
//         // });f




//         const image = aiResponse.data.data[0].b64_json;

//         res.status(200).json({ photo: image });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response.data.error.message);
//     }
// });

// // Handle GET requests (the new addition)
// router.route('/').get((req, res) => {
//     res.send("DALL-E API is running. Please use POST to submit prompts.");
// });

// export default router;








// ORIGINAL CODEEEE
// import express, { response } from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai';


// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });


// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64.json',
//         });

//         const image = aiResponse.data.data[0].b64.json;

//         res.status(200).json({ photo: image });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response.data.error.message)
//     }
// });

// export default router;