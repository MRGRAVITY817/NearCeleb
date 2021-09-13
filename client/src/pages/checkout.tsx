import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const handleCheckout = async () => {
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId,
    });
  };
  return (
    <div>
      <Head>Near Celeb | Checkout</Head>
      <div className="laptop:p-32 h-screen">
        <h1 className="font-charmonman text-4xl italic font-bold">Checkout</h1>
        <button
          className="my-10 p-3 border-2 rounded-xl shadow-md"
          role="link"
          onClick={() => handleCheckout()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
