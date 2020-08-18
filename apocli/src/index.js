import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { render} from 'react-dom'
import * as serviceWorker from './serviceWorker';
import {ApolloClient, gql, InMemoryCache, ApolloProvider, useQuery} from "@apollo/client";


const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
})

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
        currency
        rate
        name
        
    }
}
`;

function ExchangeRates() {
  const { loading, error, data} = useQuery(EXCHANGE_RATES, {

    pollInterval: 0,
  });

  if (loading) return <p>Wait for it...</p>
  if (error) return <p>Error: Heads will roll!!!</p>

  return data.rates.map(({ currency, rate, name}) => (
    <div key={currency}>
      <p>
  {currency}: {rate} -- {name}</p>
    </div>
  ))
}

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="padme">
            <h2>We're about to land. 🚀</h2>
            <div>
              <ExchangeRates />
            </div>
        </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'))



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
