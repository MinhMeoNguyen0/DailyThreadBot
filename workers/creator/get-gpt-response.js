require('dotenv').config();
const axios = require('axios');
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

// Load your OpenAI API key from .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Generates a response using GPT-3.5 and posts a thread if successful.
 * @param {Object} repoInfo - An object containing details about the repository and its markdown.
 * @param {Function} postThread - A function that posts a thread if GPT-3.5 is successful.
 * @returns {Promise<number>} - Returns 200 if successful, 500 if there's an error.
 */
module.exports = async function(repoInfo) {
    // Prepare the prompt based on the object
    const prompt = `
        Repository Name: ${repoInfo.name}
        Description: ${repoInfo.description}
        Markdown Content: ${repoInfo.markdown}
        Summary: Please provide a summary or relevant details for the above repository in 250 characters.
    `;

    try {
        // Call GPT-3.5 API
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-3.5-turbo',
                prompt: prompt,
                max_tokens: 250, // Limit to 250 characters
                temperature: 0.7, // Adjust as needed
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Get the text from the response

        const generatedText = response.data.choices[0].text.trim();

        // Post the thread if successful

        // Return 200 status code indicating success
        return ;
    } catch (err) {
        log.error("[SERVICE][EXECEPTION][GitHub Post] error", err);
        const { error, code } = errorsCodes.SERVER_ERROR;
        defer.resolve({
          error,
          message: errorsMessages.SERVER_ERROR,
          code,
        });

        // Return 500 status code indicating failure
        return 500;
    }
}
