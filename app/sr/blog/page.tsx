import { BlogIndex } from "../../components/BlogIndex";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function BlogPageSr() {
  return (
    <>
      <Header locale="sr" />
      <main id="main">
        <BlogIndex locale="sr" />
      </main>
      <Footer locale="sr" />
    </>
  );
}
