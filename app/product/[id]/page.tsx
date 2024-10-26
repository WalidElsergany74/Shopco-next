import { getProducts, getSingleProduct } from '@/actions/action';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import SingleProduct from '@/app/components/SingleProduct';
import React from 'react';

interface IParams {
  id: string;
}

interface IProps {
  params: IParams;
}

// Metadata for individual product page
export async function generateMetadata({ params }: IProps) {
  const product = await getSingleProduct(params.id);

  return {
    title: product?.title ? `${product?.title} | ShopCo.` : 'Product Page | ShopCo.',
    description: product?.desc || 'Explore this amazing product!',
    keywords: product?.title ? product?.title.split(" ") : ['ecommerce', 'product'],
    openGraph: {
      title: product?.title,
      description: product?.desc,
     
      images: [
        {
          url: product?.img1?.url,
          alt: product?.title,
        },
      ],
    },
   
  };
}

const page = async ({ params }: IProps) => {
  const product = await getSingleProduct(params.id);
  const { data } = await getProducts();
  console.log(data)

  return (
    <>
     <Header />
      <SingleProduct product={product} products={data} />
      <Footer/>
    </>
  );
};

export default page;
