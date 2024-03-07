const selectPosts = select => {
  const posts= select('.//a[@class="box-medium"]');

  return posts;
};
module.exports = selectPosts;
