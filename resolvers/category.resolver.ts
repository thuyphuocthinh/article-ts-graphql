import Categories from "../models/categories.model";

export const resolversCategory = {
  Query: {
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

  Mutation: {
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
