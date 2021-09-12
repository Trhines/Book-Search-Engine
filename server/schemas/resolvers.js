const { User, Book } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query:{
        getSingleUser: async (parent, args, context) => {
          if(!context.user){
            throw new AuthenticationError('you need to be logged in')
          }
            const foundUser = await User.findOne({_id: context.user._id})
            return foundUser;
        },
    },

    Mutation:{
        createUser: async (parent, args) => {
          console.log("create user")
          console.log(args)
            const user = await User.create(args);

            const token = signToken(user);
            console.log(user)
            return ({ token, user });
        },
        login: async (parent, args) => {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect Password')
            }
            console.log(user)
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookInfo }, context) => {
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookInfo } },
                { new: true, runValidators: true }
              );
              return (updatedUser);
            } catch (err) {
              console.log(err);
              return new AuthenticationError(err);
            }
        },
        deleteBook: async (parent, {bookId}, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              );
              if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!")
              }
              return (updatedUser);
        },
        
    }
}

module.exports = resolvers