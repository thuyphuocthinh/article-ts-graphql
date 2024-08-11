import { generateRandomString } from "../helpers/generate.helper";
import Users from "../models/users.model";
import md5 from "md5";

export const resolversUsers = {
  Query: {
    getUser: async (_, args, context) => {
      const user = await Users.findOne({
        token: context["user"].token,
        deleted: false,
      });
      return {
        code: 200,
        message: "Thanh cong",
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        token: user.token,
      };
    },
  },

  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;
      const emailExist = await Users.findOne({
        email: user.email,
        deleted: false,
      });
      if (emailExist) {
        return {
          code: 400,
          message: "Email da ton tai",
        };
      }
      user.password = md5(user.password);
      user.token = generateRandomString(30);
      const record = new Users(user);
      await record.save();
      return {
        code: 200,
        message: "Thanh cong",
        id: record.id,
        fullName: record.fullName,
        email: record.email,
        token: record.token,
      };
    },

    loginUser: async (_, args) => {
      const { user } = args;
      const { email, password } = user;

      const emailExist = await Users.findOne({ email: email, deleted: false });

      if (!emailExist) {
        return {
          code: 400,
          message: "Email khong ton tai",
        };
      }

      if (emailExist.password !== md5(password)) {
        return {
          code: 400,
          message: "Sai mat khau",
        };
      }

      return {
        code: 200,
        message: "Thanh cong",
        id: emailExist.id,
        fullName: emailExist.fullName,
        email: emailExist.email,
        token: emailExist.token,
      };
    },
  },
};
