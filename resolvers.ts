import Articles from "./models/articles.model";
import Categories from "./models/categories.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getListArticles: async () => {
      const articles = await Articles.find({
        deleted: false,
      });
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
    getListCategory: async () => {
      const categories = await Categories.find({ deleted: false });
      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;
      const category = await Categories.findOne({
        _id: id,
        deleted: false,
      });
      return category;
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
    createCategory: async (_, args) => {
      const { category } = args;
      const record = new Categories(category);
      await record.save();
      return record;
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;
      await Categories.updateOne(
        {
          _id: id,
        },
        category
      );
      const record = await Categories.findOne({ _id: id, deleted: false });
      return record;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;
      await Categories.updateOne(
        {
          _id: id,
        },
        { deleted: true, deletedAt: new Date() }
      );
      return "Deleted successfully";
    },
  },
};
