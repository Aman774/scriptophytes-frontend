export default {
  authentication: {
    signUp: "user/register/"
  },

  article: {
    add: "articles/add_content/",
    update: article_id => `articles/update_content/${article_id}/`,
    getAll: "articles/get_all/",
    getAuthorAll: "articles/get_author_all/",
    getParticular: article_id => `articles/get_particular/${article_id}`,
    getUnpublishedArticles: "articles/get_unpublished_article",
    getUnpublishedParticular: article_id =>
      `articles/get_Unpublishedparticular/${article_id}`
  },
  category: {
    getAll: "articles/get_all_categories",
    getParticularArticle: category_id =>
      `articles/get_particular_category/${category_id}`
  },
  comment: {
    addComment: "articles/add_comment/",
    getComments: article_id => `articles/get_article_comments/${article_id}`
  },
  like: {
    addLike: "articles/add_like/"
  }
};
