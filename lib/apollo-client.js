import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

let client;

export async function getApolloClient() {
  if (!client) {
    client = await _createApolloClient(); // Wait for cache persistence
  }
  return client;
}

async function _createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_BASE_URL,
    useGETForQueries: true,
  });
 
  // Authentication middleware
  const authMiddleware = setContext((_, { headers }) => {
    const token = "";
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLinkWithMiddleware = authMiddleware.concat(httpLink);

  // Cache initialization
  const cache = new InMemoryCache({
    typePolicies: {
      Language: {
        keyFields: ["en", "hi", "mr"], 
      }
    },
  });

  // ✅ Only persist cache if `window` is available (client-side)
  if (typeof window !== "undefined") {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
  }

  // Create and return Apollo Client
  return new ApolloClient({
    link: httpLinkWithMiddleware,
    cache,
    connectToDevTools: true,
  });
}
