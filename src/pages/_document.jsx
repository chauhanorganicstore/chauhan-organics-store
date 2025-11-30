import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Chauhan Organic Store – Jaggery, A2 Ghee, Atta, Pulses, Dry Fruits. 100% Organic, Chemical-free products from farmers of India." />
          <meta name="keywords" content="Organic Store, Jaggery, A2 Ghee, Atta, Pulses, Mustard Oil, Cold Pressed Oil, Natural Food" />
          <meta name="author" content="Chauhan Organic Store" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
