
export interface ICartItem {
  id: number;
  documentId: string;
  size: string;
  quantity: number;
  createdAt: string; // يمكنك استخدام Date إذا كنت ستتعامل مع تاريخ JavaScript مباشرة
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  userId: string;
  totalItem: number;
  productId: string;
  name: string;
  image: string;
  price : number
}

export  interface IProductImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  }
  
 export interface IProductSize {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  }
  
 export interface IProductColor {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  }
 export interface IProductSubCat {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    img : IProductImage ;
    publishedAt: string;
    locale: string | null;
  }
  
 export interface IProductReview {
  id: number,
  documentId: string,
  rating: number,
  comment: string
  reviewerName: string,
  createdAt: string
  updatedAt: string,
  publishedA: string,
  locale?: null

  }
  
 export interface IProduct {
    id: number;
    documentId: string;
    title: string;
    desc: string;
    price: number;
    oldPrice: number;
    rating: number;
    isNew: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    stock: number;
    type : string
    sub_category : IProductSubCat
    category : IProductSubCat
    img1: IProductImage;
    img2: IProductImage;
    img3: IProductImage;
    color: IProductColor;
    sizes: IProductSize[];
    reviews : IProductReview[]
  }

  
  
 export interface MetaPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
export  interface Meta {
    pagination: MetaPagination;
  }
  
 export interface ProductDataResponse {
    data: IProduct[];
    meta: Meta;
  }

  export interface ICategories {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    img: IProductImage;
  }


  
  export interface IShipping {
    id: number;
    documentId: string;
    firstName: string;
    lastname: string;
    email: string;
    country: string;
    state: string;
    city: string;
    phonenumber: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  }
  
export  interface IOrder {
    id: number;
    documentId: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    orderstatus: string;
    userId: string;
    cart_items: ICartItem[];
    shipping: IShipping;
    localizations: any[];
  }
  
  interface IMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
  
 export interface IOrderResponse {
    data: IOrder[];
    meta: IMeta;
  }
  