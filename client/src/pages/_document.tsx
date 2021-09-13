import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default class extends Document {
  static getInitialProps = async (context: DocumentContext) => {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  };
  render() {
    return (
      <Html lang="ko" className="overflow-x-hidden">
        <Head></Head>
        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
