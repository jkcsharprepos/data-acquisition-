const selectPosts = select => {
  const posts= select('//*[@id="section_list-items"]/div/span');

  return posts;
};
module.exports = selectPosts;
