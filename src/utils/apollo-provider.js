"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { host } from './constants';

const client = new ApolloClient({
    uri: host +'/graphql',
    cache: new InMemoryCache(),
  });
  



export function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
            </ApolloProvider>
    );
}
