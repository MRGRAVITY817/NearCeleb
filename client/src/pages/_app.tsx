import { AppProps } from "next/app";
import "../styles/globals.css";
import "swiper/swiper-bundle.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "../components/common/templates/Layout/Layout";
import { useApollo } from "../lib/apollo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;
