import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SingUpModal from './components/signUpModal'
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
<div className="rounded-s-full">
       
    <ApolloProvider client={client}>

      <StoreProvider>
        
         <Nav />
         {/* <div className="App flex flex-col items-center justify-center" onClick={SignUpModal}>
            <SignUpModal />
          </div> */}
        <Outlet />       
      </StoreProvider>

    </ApolloProvider>
 </div>
  );
}

export default App;
