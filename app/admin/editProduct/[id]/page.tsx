import { getFilterCats, getFilterColors, getSingleProduct, getSizes, getSubCategories } from '@/actions/action'
import EditProduct from '@/app/components/EditProduct'
import React from 'react'



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
        url: `https://yourwebsite.com/product/${params.id}`,
        images: [
          {
            url: product?.img1?.url,
            alt: product?.title,
          },
        ],
      },
     
    };
  }
const page = async ({params} :IProps) => {
    const product = await getSingleProduct(params.id);
   
    const cats = await getFilterCats()
    const subCats = await getSubCategories()
    const colors = await getFilterColors()
    const sizes  = await getSizes()
  return (
   <>
   <EditProduct product={product}  sizes={sizes?.data} colors={colors} subCats={subCats?.data} cats={cats?.data}/>
   </>
  )
}

export default page
