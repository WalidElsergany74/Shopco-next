"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"

export async function getProducts() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/products?populate=img1&populate=img2&populate=color&populate=sizes&populate=sub_category&populate=category`);
     
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}
export async function getProductsAdmin(page = 1, pageSize = 5) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=updatedAt:desc&sort=createdAt:desc`);
     
        return response?.data;
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/admin/products");
}





export async function getProductsType(type : string) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/products?populate=img1&populate=img2&populate=color&populate=sizes&[filters][type][$eq]=${type}` , {
          
        });
     
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}
export async function getSingleProduct(documentId : string) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/products/${documentId}?populate=color&populate=sizes&populate=img1&populate=img2&populate=img3&populate=reviews&populate=category&populate=sub_category`);
      
    return response?.data?.data
    
    } catch (error) {
         console.log(error)
        
    }

    // revalidatePath(`/admin/product/${documentId}`)
}
export async function getSingleCat(documentId : string) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/categories/${documentId}?populate=*`);
      
    return response?.data?.data
    
    } catch (error) {
         console.log(error)
        
    }

    
}
export async function getCateogries() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/categories?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}
export async function getFilterCategories(id : {id : string}) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/sub-categories?[filter][categories][id][$eq]=${id}`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}
export async function getSubCategories() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/sub-categories?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

 
}
export async function getSizes() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/sizes?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

 
}
export async function getFilterCats() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/categories?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}
export async function getFilterColors() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/colors?populate=*`);
      
    return response?.data?.data
    
    } catch (error) {
         console.log(error)
        
    }

  
}
export async function getColorsAdmin() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/colors?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/admin/colors")
}
export async function getOrdersAdmin(page=1 , pageSize =5) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/orders?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=updatedAt:desc&sort=createdAt:desc`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/admin/orders")
}
export async function getOrders(id : string | null) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/orders?filters[userId][$eq]=${id}`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/admin/orders")
}
export async function getSingleOrder(documentId : string) {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/orders/${documentId}?populate=*`);
      
    return response?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/admin/orders")
}

export async function getReviews() {
    try { 
        const response = await axios.get(`${process.env.NEXT_STRAPI_URL}/reviews`);
      
    return response?.data?.data
    
    } catch (error) {
         console.log(error)
        
    }

    revalidatePath("/")
}

