"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://192.168.1.6:3005/graphql',
    cache: new InMemoryCache(),
  });
  



export function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
            </ApolloProvider>
    );
}
