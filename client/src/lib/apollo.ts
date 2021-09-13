import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN, APOLLO_STATE_PROP_NAME } from "./constants";
import merge from "deepmerge";
import { isEqual } from "date-fns";
import { useMemo } from "react";
import { signOut } from "next-auth/client";
// Login Token
let token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
}
export const isLoggedInVar: ReactiveVar<boolean> = makeVar(Boolean(token));
export const authTokenVar: ReactiveVar<string | null> = makeVar(token);
// Celeb Page Slug
export const celebSlug: ReactiveVar<string[]> = makeVar(["", ""]);

// Log User out
export const logUserOut = async () => {
  await signOut({
    callbackUrl:
      process.env.NODE_ENV === "production"
        ? `https://nearceleb.com/`
        : `http://localhost:3333/`,
  });
  isLoggedInVar(false);
  authTokenVar(null);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

interface LogUserInParams {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export const logUserIn = async ({ ok, error, token }: LogUserInParams) => {
  if (error) return;
  if (ok && token && typeof window !== undefined) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    authTokenVar(token);
    isLoggedInVar(true);
  }
};

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? `https://nearceleb.com/graphql`
      : `http://localhost:4444/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const createApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Auth
            isLoggedIn: {
              read() {
                return isLoggedInVar();
              },
            },
            token: {
              read() {
                return authTokenVar();
              },
            },
          },
        },
      },
    }),
  });

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const initApollo = (initState: any = null) => {
  const client = apolloClient ?? createApolloClient();
  if (initState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();
    const data = merge(initState, existingCache, {
      arrayMerge: (dstArray, srcArray) => [
        ...srcArray,
        ...dstArray.filter((d) => srcArray.every((s) => !isEqual(d, s))),
      ],
    });
    client.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return client;
  // Create the Apollo Client once in the client side
  if (!apolloClient) apolloClient = client;
  return client;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initApollo(state), [state]);
  return store;
};
