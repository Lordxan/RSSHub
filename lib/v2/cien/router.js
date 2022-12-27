module.exports = function (router) {
  router.get('/creator/:creatorId', require('./creator'));
};
