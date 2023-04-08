// import { useMemo } from 'react';
// import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

// let apolloClient: ApolloClient<NormalizedCacheObject>;

// function createApolloClient() {
//     console.log('createApolloClient!!!!!!!!!!!!!!!!!!!!!!');

//     return new ApolloClient({
//         ssrMode: typeof window === 'undefined',
//         uri: 'http://localhost:3000/api/graphql', // replace with your GraphQL API endpoint
//         cache: new InMemoryCache(),
//     });
// }

// export function initializeApollo(initialState: any = null) {
//     const _apolloClient = apolloClient ?? createApolloClient();

//     // If your page has Next.js data fetching methods that use Apollo Client,
//     // the initial state gets hydrated here
//     if (initialState) {
//         _apolloClient.cache.restore(initialState);
//     }

//     // For SSG and SSR always create a new Apollo Client
//     if (typeof window === 'undefined') return _apolloClient;

//     // Create the Apollo Client once in the client
//     if (!apolloClient) apolloClient = _apolloClient;

//     return _apolloClient;
// }

// export function useApollo(initialState: any) {
//     const store = useMemo(() => initializeApollo(initialState), [initialState]);
//     return store;
// }


import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client'
import merge from "ts-deepmerge";
import { getCookie } from "cookies-next";

//Initialize apolloClient
let apolloClient: ApolloClient<NormalizedCacheObject>;

//Creating link
function createIsomorphLink() {
    return new HttpLink({
        uri: "http://localhost:3000/api/graphql",
        credentials: 'same-origin'
    })
}

//Create apollo client
function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: createIsomorphLink(),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                errorPolicy: "all",
                context: {
                    headers: {
                        authorization: `Bearer ${getCookie("session")}`
                    }
                }
            },
            mutate: {
                errorPolicy: "all",
                context: {
                    headers: {
                        authorization: `Bearer ${getCookie("session")}`
                    }
                }
            }
        }
    })
}

//Initialize Apollo
export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()
    if (initialState) {
        const existingCache = _apolloClient.extract()
        const data = merge(initialState, existingCache)
        _apolloClient.cache.restore(initialState)
    }
    if (typeof window === 'undefined') return _apolloClient
    if (!apolloClient) apolloClient = _apolloClient
    return _apolloClient
}

//Use Apollo
export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store;
}
