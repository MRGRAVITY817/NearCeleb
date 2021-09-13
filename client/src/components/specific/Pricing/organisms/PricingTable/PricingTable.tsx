import { ListContent } from "../../../../common/molecules";
import { PricingItem } from "../../molecules";

export const PricingTable = () => {
  return (
    <div className="grid gap-2 tablet:gap-4 laptop:gap-6 grid-cols-1">
      <PricingItem
        title="Cloud Letters"
        bgCover="/pricing/cloudLetters.jpg"
        content={
          <ListContent
            title="Cloud letters are sent to celeb's cloud postbox."
            contents={[
              "Letters are sent in digital image format.",
              "For actual paper letters, try 'Post Print' service.",
            ]}
          />
        }
        price={2}
      />
      <PricingItem
        title="Paper Letters"
        bgCover="/pricing/postPrint.jpg"
        content={
          <ListContent
            title="We print & deliver your paper letter to actual celeb's place."
            contents={[
              "Special paper materials are used for printing.",
              "You can monitor the realtime delivery status.",
              "And of course, letters are saved in cloud service.",
            ]}
          />
        }
        preparing
      />
      <PricingItem
        title="Translation"
        bgCover="/pricing/translate.jpg"
        content={
          <ListContent
            title="Translate your letter with our best translation team."
            contents={[
              "For any serviced language, will be translated by our professionals.",
              "Both pre & post translated version of letters will be put in wooden hardcase.",
              "Celebs can also see them in cloud postbox.",
            ]}
          />
        }
        preparing
      />
      <PricingItem
        title="Delivery Agent"
        bgCover="/pricing/deliveryAgent.jpg"
        content={
          <ListContent
            title="No need to find celeb's address anymore."
            contents={[
              "Select celeb to send letters or packages, and the rest of the work is done by us.",
              "You can monitor the realtime delivery status in our web/mobile application.",
            ]}
          />
        }
        preparing
      />
      <PricingItem
        title="Handwritten Font"
        bgCover="/pricing/handwrittenFont.jpg"
        content={
          <ListContent
            title="You can generate your personalized handwritten font with our AI engine."
            contents={[
              "By analyzing handwriting images, AI engine will generate personalized digital font.",
              "Upload your own font in 'Font Store' to make actual profit by online purchase.",
            ]}
          />
        }
        preparing
      />
      <PricingItem
        title="Subscription"
        bgCover="/pricing/subscription.jpg"
        content={
          <ListContent
            title="We provide extra goodies for our monthly/annually subscribed members."
            contents={[
              "More benefits for using cloud/paper letter services.",
              "Free translation service (for limited rounds)",
              "Free NFT stamp image of celeb (for limited amount)",
            ]}
          />
        }
        preparing
      />
    </div>
  );
};
