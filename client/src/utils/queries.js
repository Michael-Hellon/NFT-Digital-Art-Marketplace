import { gql } from '@apollo/client';

export const QUERY_PIECES = gql`
  query getPieces($category: ID) {
    pieces(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($pieces: [PieceInput]) {
    checkout(pieces: $pieces) {
      session
    }
  }
`;

export const QUERY_ALL_PIECES = gql`
  {
    pieces {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        piece {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
