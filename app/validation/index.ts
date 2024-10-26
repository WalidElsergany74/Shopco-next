import { z } from "zod";
export const addProductSchema = z.object({
  productName : z.string().min(1 , {message : "Product name is required"}),
  productDescription : z.string().min(1 , {message : "Product description is required"}).max(550 , "Product Description must be less than 550 characters"),
  productStock : z.string().min(1 , {message : "Product stock is required"}).max(5 , "Product stock must be less than or equal 5 numbers"),
  productPrice :  z.string().min(1 , {message : "Product price is required"}).max(5 , "Product price must be less than or equal 5 numbers"),
  productType: z.string().nonempty("Product Type is required"),
  category: z.string().nonempty("Category is required"),
  subCategory: z.string().nonempty("Sub-Category is required"),
  color: z.string().nonempty("Color is required"),
  size: z.string().nonempty("Size is required"),
  img1 : z.instanceof(File),
  img2 : z.instanceof(File),
  img3 : z.instanceof(File),
  })

