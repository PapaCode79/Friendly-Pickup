const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    pickups: [Pickup]
    friends: [User]
  }

  type Pickup {
    _id: ID
    pickupText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    pickups(username: String): [Pickup]
    pickup(_id: ID!): Pickup
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPickup(pickupText: String!): Pickup
    addReaction(pickupId: ID!, reactionBody: String!): Pickup
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
