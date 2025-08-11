import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../../next-seo.config";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <DefaultSeo {...defaultConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
