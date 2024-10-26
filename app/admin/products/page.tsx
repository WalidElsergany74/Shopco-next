import { getProducts, getProductsAdmin } from "@/actions/action";
import ProductsAdmin from "@/app/components/ProductsAdmin";




  export async function generateMetadata() {
    const product = await getProducts();
  
    return {
      title: product?.title ? `${product?.title} ` : 'Products Admin Page',
      description: product?.desc || 'Explore this amazing product!',
      keywords: product?.title ? product?.title.split(" ") : ['ecommerce', 'product'],
      openGraph: {
        title: product?.title,
        description: product?.desc,
        images: [
          {
            url: `${product?.img1?.url}`,
            alt: product?.title,
          },
        ],
      },
     
    };
  }


const ProductsPage = async () => {
       const products = await  getProductsAdmin()
       const totalItems = products?.meta?.pagination?.total || 0;

    return <div className="products flex flex-col justify-center  ">
        <h1 className="text-3xl font-extrabold tracking-wider">Products</h1>
       
             <ProductsAdmin products={products?.data} totalItems={totalItems}/>
        
       
        </div>   
     
};

export default ProductsPage;
