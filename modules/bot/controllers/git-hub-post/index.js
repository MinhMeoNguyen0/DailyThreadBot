const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config/");
const axios = require('axios');
const cheerio = require('cheerio');




module.exports = async (req, res, service) => {
  try {
    const access_token = config.access_token;
    const thread_user_id = config.thread_id;


    // const { text, media_type, image_url } = req.query;



    // use Axios to crawl github.com/trending

    const crawlData = await axios.get('https://github.com/trending');

    let $ = cheerio.load(crawlData.data);
    const $firstRepo = $('.Box-row', crawlData.data).first();


    const repoHREF = $firstRepo.find('a').attr('href').split("%2F");
    
    const repoLanguage = $firstRepo.find('span[itemprop="programmingLanguage"]').text().trim();
    const repoData = {
      repo_name: repoHREF.pop(),
      author: repoHREF.pop(),
      language: repoLanguage,
      repoWebSiteExist: false,

    };
    const repoUrl = `https://github.com/${repoData.author}/${repoData.repo_name}`;
    repoData.repo_url = repoUrl;
    const repoREADME = await axios.get(`https://raw.githubusercontent.com/${repoData.author}/${repoData.repo_name}/master/README.md`);
    const repoDescription = repoREADME.data;
    // console.info("[CONTROLLER][INFO] Repo Description", repoDescription.slice(0, repoDescription.length % MARKDOWN_WORLD_LIMIT));
    





    const crawlRepo = await axios.get(repoUrl);
    $ = cheerio.load(crawlRepo.data);
    const $aboutRepo = $('.BorderGrid-cell', crawlRepo.data).first();
    const repoWebsite = $aboutRepo.find('a').attr('href');
    if (repoWebsite.length > 0 && !repoWebsite.includes('topics') && !repoWebsite.includes("readme")) {
      repoData.repoWebSiteExist = true;
      repoData.website = repoWebsite;
    }
    const forksCount = $('#repo-network-counter').text();
    // Get the text content of the span with id 'repo-stars-counter-star'
    const starsCount = $('#repo-stars-counter-star').text();
    const about = $('.f4.my-3').text().trim();
    repoData.forks_count = forksCount;
    repoData.stars_count = starsCount;
    repoData.about = about;

    
    let data = await service.gitHubPost({ repoData,repoDescription, thread_user_id, access_token });
    
    if (data.error) {
      return res.status(500 || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
        code : errorsCodes.BAD_REQUEST
      });
    } else {
      return res.status(200).json({...repoData, data });
    }
  } catch (err) {
    console.error("[CONTROLLER][EXCEPTION][Add New Thread] error", err);
    const { code, error } = errorsCodes.SERVER_ERROR;
    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
};
