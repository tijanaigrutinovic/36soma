import { BlogIndex } from "../components/BlogIndex";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function BlogPage() {
  return (
    <>
      <Header locale="en" />
      <main id="main">
        <BlogIndex locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
