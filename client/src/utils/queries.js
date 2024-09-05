import { gql } from '@apollo/client';

export const QUERY_ARTPIECES = gql`
  query getArtPieces($category: ID) {
    artPieces(category: $category) {
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
  query getCheckout($artPieces: [ArtInput]) {
    checkout(artPieces: $artPieces) {
      session
    }
  }
`;

export const QUERY_ALL_ARTPIECES = gql`
  {
    artPieces {
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
        artPieces {
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
