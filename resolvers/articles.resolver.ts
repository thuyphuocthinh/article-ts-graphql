import Articles from "../models/articles.model";
import Categories from "../models/categories.model";

export const resolversArticles = {
  Query: {
    getListArticles: async (_, args) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems,
        filterKey,
        filterValue,
        keyword,
      } = args;
      const sort = {};

      // sort
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }

      // pagination
      let skip = 0;
      if (currentPage && limitItems) {
        skip = (currentPage - 1) * limitItems;
      }

      // filter
      const find = {
        deleted: false,
      };

      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      // search
      if (keyword) {
        const regex = new RegExp(keyword, "i");
        find["title"] = regex;
      }

      const articles = await Articles.find(find)
        .sort(sort)
        .limit(limitItems)
        .skip(skip);

      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;
      const article = await Articles.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
  },

  Article: {
    category: async (article) => {
      const categoryId: string = article.categoryId;
      const category = await Categories.findOne({
        _id: categoryId,
        deleted: false,
      });
      return category;
    },
  },

  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      const record = new Articles(article);
      await record.save();
      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      await Articles.updateOne(
        {
          _id: id,
        },
        { deleted: true, deletedAt: new Date() }
      );
      return "Deleted successfully";
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;
      await Articles.updateOne(
        {
          _id: id,
        },
        article
      );
      const record = await Articles.findOne({ _id: id, deleted: false });
      return record;
    },
  },
};
