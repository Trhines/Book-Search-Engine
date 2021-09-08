const { User, Book } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query:{
        getSingleUser: async (parent, args, context) => {
          if(!context.user){
            throw new AuthenticationError('you need to be logged in')
          }
            const foundUser = await User.findOne({
                $or: [{ _id: args ? args._id : args.id }, { username: args.username }],
              });
            return foundUser;
        },
    },

    Mutation:{
        createUser: async (parent, args) => {
          console.log(args)
            const user = await User.create(args);

            const token = signToken(user);
            console.log(user)
            return ({ token, user });
        },
        login: async (parent, args) => {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        
            const correctPw = await user.isCorrectPassword(args.password);
            console.log(correctPw)
            if (!correctPw) {
              throw new AuthenticationError('Incorrect Password')
            }

            const token = signToken(user);
            return ({ token, user });
        },
        saveBook: async (parent, args) => {
            console.log(args);
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: args._id },
                { $addToSet: { savedBooks: args } },
                { new: true, runValidators: true }
              );
              return (updatedUser);
            } catch (err) {
              console.log(err);
              return new AuthenticationError(err);
            }
        },
        deleteBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: args._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
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