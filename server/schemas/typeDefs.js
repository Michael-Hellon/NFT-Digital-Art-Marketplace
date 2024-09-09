const typeDefs = /* GraphQL */`
  type Category {
    _id: ID
    name: String
  }

  type Piece {
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
    piece: [Piece]
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

  input PieceInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    pieces(category: ID, name: String): [Piece]
    piece(_id: ID!): Piece
    user: User
    order(_id: ID!): Order
    checkout(pieces: [PieceInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(pieces: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updatePiece(_id: ID!, quantity: Int!): Piece
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
