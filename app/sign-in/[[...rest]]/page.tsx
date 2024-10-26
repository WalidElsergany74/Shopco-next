import dynamic from 'next/dynamic';

// Dynamically import the SignIn component from Clerk
const DynamicSignIn = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignIn), { ssr: false });

// Metadata for the page
export const metadata = {
  title: "Login to ShopCo | Access Your Fashion Account",
  description: "Log in to your ShopCo account to explore a wide range of clothing for men and women. Access personalized fashion recommendations, exclusive offers, and your order history. Discover the latest trends and shop your favorite styles today.",
  keywords: "login, ShopCo, account login, fashion account, personalized fashion, exclusive offers, online clothing store, men's fashion, women's fashion, fashion trends",
};



export default function Page() {
  return (
    <div className='py-10 flex justify-center'>
      <DynamicSignIn afterSignInUrl={"/"} />
    </div>
  );
}
