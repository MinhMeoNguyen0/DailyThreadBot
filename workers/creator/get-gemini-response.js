
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
// const GEMINIAI_API_KEY = process.env.GOOGLE_API_KEY;

// Load your OpenAI API key from .env

/**
 * Generates a response using GEMINI AI and posts a thread if successful.
 * @param {Object} repoInfo - An object containing details about the repository and its markdown.
 * @param {Function} postThread - A function that posts a thread if GEMINI AI is successful.
 * @returns {Promise<number>} - Returns 200 if successful, 500 if there's an error.
 */
module.exports = async ( params ) => {
    
    const { repoData, repoDescription } = params;

    const isExistPersonalWebsite = repoData => repoData?.repoWebSiteExist ? true : false


    // Initialzing the model
    // Prepare the prompt based on the object
    const prompt = `
        Repository Name: ${repoData.repo_name}
        Description: ${repoData.about ? repoData.about : ''}
        Author: ${repoData.author}
        Language: ${repoData.language}
        Stars: ${repoData.stars_count}
        Forks: ${repoData.forks_count}
        repo_url: ${isExistPersonalWebsite(repoData)}
        Markdown Content: ${repoDescription} 
        You are a social media manager for a tech-focused Instagram Threads account, tasked with boosting the visibility of open-source projects. Craft a post about today's trending GitHub repository with these guidelines:
        Highlight: Start with the number of stars and forks of the repository, with emojis. Mention the repository author and programming language.
        Summary: Write a non-technical summary of the repository's key features or benefits at least 50 words.
        Hashtag: Include a single popular tech-related hashtag at the end of the summary no need line needed.
        Format: Only use plain text, numbers, and emojis. No bold, italics, or embedded content is possible—everything must be in plain text.
        Link: Add the repository's website link if available, or the raw GitHub link, pasted at the end of the post.
        Length: THE POST MUST BE UNDER 500 characters | YOU WILL BE FIRED IF IT'S OVER 500 CHARACTERS.
        Engagement: Make the post engaging to encourage clicks on the link.
        Accuracy: Ensure all information is correct and avoid fabrication.
    `;
    try {
        // Call GEMINI API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return { error: false, message: text };
    } catch (err) {
        console.error("[SERVICE][EXECEPTION][GitHub Post] error", err);
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

