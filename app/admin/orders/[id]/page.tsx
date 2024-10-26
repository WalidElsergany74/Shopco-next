import { getSingleOrder } from '@/actions/action';
import OrderDetails from '@/app/components/OrderDetails';
import React from 'react';

interface IParams {
    id: string;
}

interface IProps {
    params: IParams;
}

export async function generateMetadata({ params }: IProps) {
    const order = await getSingleOrder(params.id);

    if (!order || order.data.length === 0) {
        return {
            title: 'Order Details ',
            description: 'View detailed information about your order on ShopCo.',
        };
    }

    const orderData = order?.data;
    const productTitle = orderData?.cart_items?.name || 'Order Details';
    const productDescription = `Order ID: ${orderData?.documentId} - Status: ${orderData?.orderstatus}`;
    const keywords = [productTitle, 'Order', 'E-commerce', orderData.orderstatus];

    return {
        title: `${productTitle} `,
        description: productDescription,
        keywords,
        openGraph: {
            title: `${productTitle} `,
            description: productDescription,
          
        },
    };
}

const page = async ({ params }: IProps) => {
    const order = await getSingleOrder(params.id);

    return (
        <OrderDetails order={order?.data} />
    );
}

export default page;
