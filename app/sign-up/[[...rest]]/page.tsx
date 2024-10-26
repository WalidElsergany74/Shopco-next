
import dynamic from 'next/dynamic';

const DynamicSignUp = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignUp), { ssr: false });


export const metadata = {
  title: "Sign Up for Exclusive Fashion Deals | ShopCo",
  description: "Create your ShopCo account and unlock exclusive fashion deals. Discover the latest clothing trends for men and women, including T-shirts, shorts, shirts, trousers, polo shirts, hats, and shoes. Get personalized recommendations and enjoy early access to special offers!",
  keywords: "sign up, ShopCo, exclusive fashion deals, online clothing store, men's fashion, women's fashion, T-shirts, shorts, shirts, trousers, polo shirts, hats, shoes, fashion trends, personalized recommendations",
};


export default function Page() {
  return (
    <div className='py-10 flex justify-center'>
      <DynamicSignUp afterSignInUrl={"/"} />
    </div>
  );
}
