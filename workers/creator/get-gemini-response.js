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
module.exports = async function(params) {
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
        Highlight: Begin with the number of stars and forks (include emotes) and mention the @author and the programminglanguage they use.
        Summary: Provide a brief, non-technical summary of the repository's key features or benefits, you can not bold or italicize the text, just normal text.
        Link: Use the repository's personal website link if available; otherwise, include the raw GitHub link, no imbedded links, patse the link.
        Length: Keep the post within 500 characters.
        Engagement: Make the post engaging to encourage your audience to click the link.
        Hashtag: Include one popular tech-related hashtag.
        Accuracy: Ensure all details are accurate and avoid any fabricated information.
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
