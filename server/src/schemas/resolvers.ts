import User from "../models/index.js";
import { signToken } from '../services/auth.js';


interface UserContext {
  user: {
    username: string | null;
    email: string | null;
    _id: string | null;
  } | null

}

// interface AddProfileArgs {
//   name: string;
// }

// interface SkillArgs {
//   profileId: string;
//   skill: string;
// }


const resolvers = {
  Query: {
    getSingleUser: async (_parent: any, _args: any, context: UserContext | null) => {
      const foundUser = await User.findOne({
        _id: context?.user?._id
      });

      if (!foundUser) {
        return null;
      }

      return (foundUser);
    }
  },
  Mutation: {
    createUser: async (_parent: any, args: any, _context: UserContext) => {
      const user = await User.create(args);

      if (!user) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return ({ token, user });
    },
    login: async (_parent: any, args: any, _context: UserContext) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        return null;
      }
    
      const correctPw = await user.isCorrectPassword(args.password);
    
      if (!correctPw) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return ({ token, user });
    },
    saveBook: async (_parent: any, args: any, context: UserContext) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context?.user?._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return (updatedUser);
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    deleteBook: async (_parent: any, args: any, context: UserContext) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context?.user?._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return null;
      }
      return (updatedUser);
    }
  }
}
export default resolvers;
