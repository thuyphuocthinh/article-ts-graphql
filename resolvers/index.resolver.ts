import { resolversArticles } from "./articles.resolver";
import { resolversCategory } from "./category.resolver";
import { resolversUsers } from "./users.resolver";

export const resolvers = [resolversArticles, resolversCategory, resolversUsers];
