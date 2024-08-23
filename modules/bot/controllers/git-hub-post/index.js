const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const config = include("common/config/");
const axios = require('axios');
const cheerio = require('cheerio');

const { buildGraphAPIURL } = include("common/utils");

module.exports = async (req, res, service) => {
  try {
    const access_token = config.access_token;
    const thread_user_id = config.thread_id;


    // const { text, media_type, image_url } = req.query;

    // yse Axios to crawl github.com/trending

    const crawlData = await axios.get('https://github.com/trending');

    const $ = cheerio.load(crawlData.data);
    const $firstRepo = $('.Box-row', crawlData.data).first();


    const repoURL = $firstRepo.find('a').attr('href').split("%2F");
    
    const repoLanguage = $firstRepo.find('span[itemprop="programmingLanguage"]').text().trim();
    const repoData = {
      repo_name: repoURL.pop(),
      author: repoURL.pop(),
      language: repoLanguage
    };
    console.info("[CONTROLLER][INFO][Github Bot Post]", repoData);
    console.log("[CONTROLLER][INFO][Github Bot Post]", repoData);

    

    // const repoMd = await axios.get(`https://raw.githubusercontent.com/${repoURL}/master/README.md`);
    // const $repoMd = cheerio.load(repoMd.data);

    // const repoDescription = $repoMd('.markdown-body').text().trim();
    // repoData.description = repoDescription;


    // console.info("[CONTROLLER]xf[INFO][Github Bot Post]", repoData);

    // let data = await service.gitHubPost({  thread_user_id, access_token });
    let data = {
      data: repoData}
    if (data.error) {
      return res.status(data.code || errorsCodes.BAD_REQUEST).json({
        message: data.message,
        error: data.error,
        code : errorsCodes.BAD_REQUEST
      });
    } else {
      return res.status(200).json({ data });
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
