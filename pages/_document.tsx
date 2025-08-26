import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* put favicons, fonts, analytics here (NO viewport) */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
