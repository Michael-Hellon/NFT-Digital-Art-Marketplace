const typeDefs = /* GraphQL */`
  type Category {
    _id: ID
    name: String
  }

  type Art {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    artPieces: [Art]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ArtInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    artPieces(category: ID, name: String): [Art]
    art(_id: ID!): Art
    user: User
    order(_id: ID!): Order
    checkout(artPieces: [ArtInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(artPieces: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateArt(_id: ID!, quantity: Int!): Art
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
