import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BusinessIcon } from "../../molecules";

const b2cImage = "/business/b2c.jpg";
const b2bImage = "/business/b2b.jpg";

const LaptopBusiness = () => {
  return (
    <div className="flex items-center justify-around">
      <div className="flex flex-col items-center justify-center">
        <img
          src={b2cImage}
          alt="B2C"
          className="w-24 laptop:w-48 h-24 laptop:h-48 border-1 laptop:border-2 border-white rounded-md object-cover object-top"
        />
        <img
          src="/business/upDown.svg"
          alt="B2C to NearCeleb"
          className="my-12 h-24 object-contain"
        />
        <img
          src={b2bImage}
          alt="B2B"
          className="w-24 laptop:w-48 h-24 laptop:h-48 border-1 laptop:border-2 border-white rounded-md object-cover object-top"
        />
      </div>
      <div className="grid gap-12 grid-flow-row">
        <div className="grid grid-flow-col">
          <BusinessIcon image="selectCeleb" title="Select" />
          <BusinessIcon image="writeLetter" title="Write Letter" />
          <BusinessIcon image="style" title="Style" />
          <BusinessIcon image="confirmSend" title="Send" />
        </div>
        <div className="grid grid-flow-col">
          <BusinessIcon image="delivery" title="Delivery" />
          <BusinessIcon image="print" title="Print" />
          <BusinessIcon image="filter" title="Filter" />
          <BusinessIcon image="analyze" title="Analyze" />
        </div>
        <div className="grid grid-flow-col">
          <BusinessIcon image="onTheWay" title="On The Way" />
          <BusinessIcon image="transition" title="Transition" />
          <BusinessIcon image="translate" title="Translate" />
          <BusinessIcon image="manage" title="Manage" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/business/rightDown.svg"
          alt="B2C to NearCeleb"
          className="mt-32 h-16 object-contain"
        />
        <img
          src="/business/nearCeleb.svg"
          alt="B2C to NearCeleb"
          className="my-12 h-32 object-contain"
        />
        <img
          src="/business/rightUp.svg"
          alt="B2C to NearCeleb"
          className="mb-32 h-16 object-contain"
        />
      </div>
    </div>
  );
};

const MobileBusiness = () => {
  const [user, setUser] = useState<"b2c" | "nearceleb" | "b2b">("b2c");
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="grid gap-8 grid-cols-3">
        <img
          src={b2cImage}
          alt="B2C"
          onClick={() => setUser("b2c")}
          className="w-24 h-24 border-1 border-white rounded-md cursor-pointer object-cover object-top"
        />
        <img
          src="/business/nearCeleb.svg"
          alt="B2C to NearCeleb"
          onClick={() => setUser("nearceleb")}
          className="h-24 cursor-pointer object-contain"
        />
        <img
          src={b2bImage}
          alt="B2B"
          onClick={() => setUser("b2b")}
          className="w-24 h-24 border-1 border-white rounded-md cursor-pointer object-cover object-top"
        />
      </div>
      <div className="grid grid-cols-4 mt-8">
        {user === "b2c" && (
          <>
            <BusinessIcon image="selectCeleb" title="Select" />
            <BusinessIcon image="writeLetter" title="Write Letter" />
            <BusinessIcon image="style" title="Style" />
            <BusinessIcon image="confirmSend" title="Send" />
          </>
        )}
        {user === "nearceleb" && (
          <>
            <BusinessIcon image="delivery" title="Delivery" />
            <BusinessIcon image="print" title="Print" />
            <BusinessIcon image="filter" title="Filter" />
            <BusinessIcon image="analyze" title="Analyze" />
          </>
        )}
        {user === "b2b" && (
          <>
            <BusinessIcon image="onTheWay" title="On The Way" />
            <BusinessIcon image="transition" title="Transition" />
            <BusinessIcon image="translate" title="Translate" />
            <BusinessIcon image="manage" title="Manage" />
          </>
        )}
      </div>
    </div>
  );
};

export const Business = () => {
  const isLaptop = useMediaQuery({ minWidth: 1048 });
  return <>{isLaptop ? <LaptopBusiness /> : <MobileBusiness />}</>;
};
