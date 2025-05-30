import Script from 'next/script';

export const StripeButtonPlatinum = () => {
  return (
    <div>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="lazyOnload"
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `
            
<stripe-buy-button
  buy-button-id="buy_btn_1RUJslRtmj8gUj2pAWSGCwov"
  publishable-key="${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"
>
</stripe-buy-button>
          `
        }}
      />
    </div>
  );
}; 