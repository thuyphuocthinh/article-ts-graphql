import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Category {
    id: ID
    title: String
    avatar: String
  }
  
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category 
    # category is not a field in database schema
    # so in resolvers => write a function to get data and return to this category
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
  }

  input CategoryInput {
    title: String
    avatar: String
  }

  type Query {
    hello: String
    getListArticles: [Article]
    getArticle(id: ID): Article
    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
    createCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`;
