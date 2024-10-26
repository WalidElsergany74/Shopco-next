import { getFilterCategories,  getFilterColors, getSingleCat } from '@/actions/action';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import ProductsCo from '@/app/components/ProductsCo'
import React from 'react'



interface IParams {
    id: string;
  }
  
  interface IProps {
    params: IParams;
  }


  export async function generateMetadata({ params }: IProps) {
    const product = await getSingleCat(params.id);
  
    return {
      title: product?.title ? `${product?.title} ` : 'Product Page | ShopCo.',
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
  
  
const  Products =  async ({params} : IProps) => {
    const {data} = await getFilterCategories({ id: params.id })
     const colors = await getFilterColors()
   

 
  return (
   <>
    <Header />
   <ProductsCo colors={colors}   id={params.id} data={data}/>
   <Footer/>
   </>
  )
}

export default Products
