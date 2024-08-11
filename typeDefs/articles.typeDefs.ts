import { gql } from "apollo-server-express";

export const typeDefsArticles = gql`
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
    categoryId: String
  }

  type Query {
    getListArticles(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItem: Int = 2
      filterKey: String
      filterValue: String
      keyword: String
    ): [Article]
    getArticle(id: ID): Article
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;
