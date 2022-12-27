const got = require('@/utils/got');
const cheerio = require('cheerio');
const config = require('@/config').value.cien;

module.exports = async (ctx) => {
  const {creatorId} = ctx.params;
  const url = `https://ci-en.dlsite.com/creator/${creatorId}/article`;
  const token = config.sessionToken;
  const headers = token ? {
    Cookie: `ci_en_session=${token}`,
  } : {};

  const response = await got({
    method: 'get',
    url,
    headers
  });

  const $ = cheerio.load(response.data);
  const image = $('.e-avatar-shell.is-creator img').attr('src');
  const items = [];

  $('.e-boxInner.is-article').each((_, element) => {
    const title = $(element).find('.article-title').text();
    const link = $(element).find('.article-title a').attr('href');
    const description = $(element).find('.c-rewardBox.is-open').html().replaceAll('vue-l-image', 'img');
    const pubDate = new Date($(element).find('.e-date').text());

    items.push({
      title,
      link,
      description,
      pubDate,
    });
  });

  ctx.state.data = {
    title: `CI-EN DLSite - Creator ID ${creatorId}`,
    link: url,
    description: `CI-EN DLSite - Creator ID ${creatorId}`,
    image,
    item: items,
  };
};
