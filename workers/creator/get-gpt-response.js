// require('dotenv').config();
// const axios = require('axios');
// const errorsCodes = include("modules/error/codes");
// const errorsMessages = include("modules/error/messages");

// // Load your OpenAI API key from .env
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// /**
//  * Generates a response using GPT-3.5 and posts a thread if successful.
//  * @param {Object} repoInfo - An object containing details about the repository and its markdown.
//  * @param {Function} postThread - A function that posts a thread if GPT-3.5 is successful.
//  * @returns {Promise<number>} - Returns 200 if successful, 500 if there's an error.
//  */
// module.exports = async function(params) {
//     const { repoData, repoDescription } = params;



//     // Prepare the prompt based on the object
//     const prompt = `
//         Repository Name: ${repoData.repo_name}
//         Description: ${repoData.about}
//         Author: ${repoData.author}
//         Language: ${repoData.language}
//         Markdown Content: ${repoDescription}
//         You are a social media manager for a tech-focused Instagram Threads account, tasked with boosting the visibility of open-source projects. Craft a post about today's trending GitHub repository with these guidelines:
//         Highlight: Begin with the number of stars and forks (include emotes) and mention the @author and the programminglanguage they use.
//         Summary: Provide a brief, non-technical summary of the repository's key features or benefits.
//         Link: Use the repository's personal website link if available; otherwise, include the raw GitHub link.
//         Length: Keep the post within 500 characters.
//         Engagement: Make the post engaging to encourage your audience to click the link.
//         Hashtag: Include one popular tech-related hashtag.
//         Accuracy: Ensure all details are accurate and avoid any fabricated information.
//     `;

//     try {
//         // Call GPT-3.5 API
//         const response = await axios.post(
//             'https://api.openai.com/v1/completions',
//             {
//                 model: 'gpt-3.5-turbo',
//                 prompt: prompt,
//                 max_tokens: 500, // Limit to 250 characters
//                 temperature: 0.7, // Adjust as needed
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         // Get the text from the response
//         const generatedText = response.data.choices[0].text.trim();
//         // if not successful
//         if (!generatedText) {
//             return { error: false, message:  "Try again later" };
//         }
//         return { error: false, message: generatedText };
//     } catch (err) {
//         console.error("[SERVICE][EXECEPTION][GitHub Post] error", err);
//         const { error, code } = errorsCodes.SERVER_ERROR;
//         defer.resolve({
//           error,
//           message: errorsMessages.SERVER_ERROR,
//           code,
//         });

//         // Return 500 status code indicating failure
//         return 500;
//     }
// }
