import { PartnerHeaderContainer } from "../../molecules";
export const PartnerHeader = () => {
  return (
    <div className="grid gap-4 laptop:gap-8 grid-flow-col w-full">
      <PartnerHeaderContainer
        bgCover="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
        content={
          <h1>
            We welcome your suggestions for our handwrittern font big data and
            other businesses. <br />
            After discussing with our team, we will be answering to your
            suggestion within a week.
          </h1>
        }
      />
      <PartnerHeaderContainer
        bgCover="https://images.unsplash.com/photo-1502920514313-52581002a659?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80"
        content={
          <h1>
            We persue startegical directions along with our investors. <br />
            Investment, branch expansion and suggestion for EXIT strategy are
            all welcomed.
          </h1>
        }
      />
    </div>
  );
};
