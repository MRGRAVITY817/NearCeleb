import { ReactChild, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Container } from "../../../../common/atoms";

interface PricingItemProps {
  title: string;
  bgCover: string;
  content: ReactChild;
  price?: number;
  preparing?: boolean;
}

interface WidePricingItemProps extends PricingItemProps {}
export const WidePricingItem: React.FC<WidePricingItemProps> = ({
  title,
  bgCover,
  content,
  price,
  preparing,
}) => {
  return (
    <div className="grid gap-2 laptop:gap-4 grid-cols-4">
      <Container bgCover={bgCover} gradient>
        <div className="flex items-center justify-center h-full">
          <h1 className="laptop:text-2xl text-xl">{title}</h1>
        </div>
      </Container>
      <div className="col-span-2">
        <Container bgColor="white">
          <div className="p-2 laptop:p-4">{content}</div>
        </Container>
      </div>
      <Container>
        <div className="flex items-center justify-center h-full">
          <h1 className="laptop:text-2xl text-xl">
            {preparing ? `Preparing` : `${price} $`}
          </h1>
        </div>
      </Container>
    </div>
  );
};

interface MobilePricingItemProps extends PricingItemProps {}
export const MobilePricingItem: React.FC<MobilePricingItemProps> = ({
  title,
  bgCover,
  content,
  price,
  preparing,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return open ? (
    <div
      onClick={() => setOpen(!open)}
      className="focus:outline-none cursor-pointer"
    >
      <Container bgColor="white">
        <div className="p-2 laptop:p-4 h-32">{content}</div>
      </Container>
    </div>
  ) : (
    <div
      onClick={() => setOpen(!open)}
      className="grid grid-cols-2 h-32 focus:outline-none cursor-pointer"
    >
      <Container bgCover={bgCover} gradient>
        <div className="flex items-center justify-center h-full">
          <h1 className="laptop:text-2xl text-xl">{title}</h1>
        </div>
      </Container>
      <Container>
        <div className="flex items-center justify-center h-full">
          <h1 className="laptop:text-2xl text-xl">
            {preparing ? `Preparing` : `${price} $`}
          </h1>
        </div>
      </Container>
    </div>
  );
};

export const PricingItem: React.FC<PricingItemProps> = ({
  title,
  bgCover,
  content,
  price = 0,
  preparing = false,
}) => {
  const isWide = useMediaQuery({ minDeviceWidth: 1024 });
  return isWide ? (
    <WidePricingItem
      title={title}
      bgCover={bgCover}
      content={content}
      price={price}
      preparing={preparing}
    />
  ) : (
    <MobilePricingItem
      title={title}
      bgCover={bgCover}
      content={content}
      price={price}
      preparing={preparing}
    />
  );
};
