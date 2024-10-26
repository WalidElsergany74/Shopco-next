import { getFilterCats, getProductsType } from "@/actions/action";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./loading";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";

import Footer from "./components/Footer";

export default async function Home() {
  // Fetch products by type
  const featuredProducts = await getProductsType("featured");
  const trendingProducts = await getProductsType("trending");
  const {data} = await getFilterCats();
 

  return (
    <>
     
      <Header />
      <Hero />
      {!featuredProducts ? <Loading/> : (
        <FeaturedProducts data={featuredProducts} type="featured" />
      )}
      <Categories cats={data} />
      <FeaturedProducts data={trendingProducts} type="trending" />
      
      <Footer/>
    </>
  );
}
