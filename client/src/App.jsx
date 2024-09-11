import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log("token A from App in:", token);

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
<div className=" bg-blue-400">
       
    <ApolloProvider client={client}>

      <StoreProvider>
        
         <Nav />

        <Outlet />       
      </StoreProvider>

    </ApolloProvider>
 </div>
  );
}

export default App;
