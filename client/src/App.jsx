import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import Header from './components/Header';
// remove Nav once Header is completed
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// don't change below - <outlet> must be there to display items
function App() {

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        {/* <Header /> */}
        <Nav />
        <Outlet />
      </StoreProvider>

    </ApolloProvider>
  );
}

export default App;
