import { Dispatch, SetStateAction } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { intToArray } from "../../../../lib/common";
import { UseState } from "../../../../lib/types/hooks";

interface ShowEightProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageArray: number[];
}

const ShowEight: React.FC<ShowEightProps> = ({
  pageArray,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <>
      {pageArray.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`mx-2 focus:outline-none transition-all ${
            currentPage === page
              ? `text-strong text-semibold text-2xl`
              : `text-white text-normal text-xl`
          }`}
        >
          {page}
        </button>
      ))}
    </>
  );
};

interface PageIndexProps {
  pages: number;
  usePage: UseState<number>;
}

export const PageIndex: React.FC<PageIndexProps> = ({ pages, usePage }) => {
  const fullArray = intToArray(pages);
  const [currentPage, setCurrentPage] = usePage;
  return (
    <div className="flex items-center justify-center my-8">
      {currentPage > 4 && (
        <button
          onClick={() => setCurrentPage(1)}
          className="mr-4 hover:text-strong focus:outline-none transition-all"
        >
          <RiArrowLeftSLine className="text-2xl" />
        </button>
      )}
      <ShowEight
        pageArray={fullArray.slice(
          currentPage > 4 ? currentPage - 4 : 0,
          currentPage > 4 ? currentPage + 4 : 8
        )}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {currentPage < pages - 3 && (
        <button
          onClick={() => setCurrentPage(pages)}
          className="ml-4 hover:text-strong focus:outline-none transition-all"
        >
          <RiArrowRightSLine className="text-2xl" />
        </button>
      )}
    </div>
  );
};
