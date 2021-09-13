import Link from "next/link";
import { useCelebsPaginated } from "../../../../../hooks/graphql/celeb/useCelebsPaginated";

export const CelebAbout = () => {
  const { data, loading } = useCelebsPaginated({ page: 1, itemsPerPage: 12 });
  const formatNumber = (num: number | null | undefined) => {
    if (typeof num === "number") {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return 0;
  };
  return (
    <div>
      {loading ? (
        <div className="text-4xl">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center laptop:px-24 px-8 py-12 laptop:py-32 w-full bg-rose-100">
          <h1 className="text-3xl laptop:text-7xl font-normal">
            <span className="text-rose-500 font-semibold">
              {formatNumber(data?.getAllCelebsPaginated.totalResults)}
            </span>{" "}
            celeb info in archive
          </h1>
          <div className="flex flex-col laptop:flex-row justify-center w-full">
            <div className="grid gap-2 laptop:gap-3 grid-cols-4 laptop:mt-20 mt-8">
              {data?.getAllCelebsPaginated.celebs?.map((celeb) => (
                <img
                  key={celeb.profileImage}
                  className="w-16 laptop:w-32 h-16 laptop:h-32 bg-rose-50 object-cover object-center"
                  src={celeb.profileImage || ""}
                  alt="Near Celeb"
                />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center laptop:ml-20 laptop:mt-20 mt-8 laptop:w-1/4 w-full laptop:text-4xl text-xl">
              <img src="/CelebBook.svg" alt="book" className="w-2/3" />
              <h1 className="laptop:mt-10 mt-4">Discover more celeb info</h1>
              <Link href="/celebs">
                <a>
                  <h1 className="mt-2 laptop:mt-5 text-rose-500 italic">
                    in Celebs Page.
                  </h1>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
