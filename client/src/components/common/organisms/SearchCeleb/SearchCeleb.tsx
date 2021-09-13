import { useEffect, useState } from "react";
import { Roles } from "../../../../lib/celeb-filter";
import { SearchCelebs } from "../../../../__generated__/SearchCelebs";
import { Filter } from "../../molecules/Filter/Filter";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import { CardGrid } from "../CardGrid/CardGrid";
import { useSearchCelebs } from "../../../../hooks/graphql/celeb/useSearchCelebs";
import { useSearchCelebsByMonth } from "../../../../hooks/graphql/celeb/useSearchCelebsByMonth";
import { CelebsByMonth } from "../../../../__generated__/CelebsByMonth";
import { makeVar, useReactiveVar } from "@apollo/client";
import { PageIndex } from "../../molecules";

const roleItems = Roles.map((role) => role.name);
export const pageVar = makeVar(1);

interface SearchCelebProps {
  half?: boolean;
  month?: boolean;
}

export const SearchCeleb: React.FC<SearchCelebProps> = ({
  half = false,
  month = false,
}) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [celebList, setCelebList] = useState<any>();
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onCompleted = (data: SearchCelebs) => {
    setCelebList(data?.searchCelebs?.celebInfo);
    setPages(data?.searchCelebs?.pages || 0);
  };

  const onCompletedMonth = (data: CelebsByMonth) => {
    setCelebList(data?.searchCelebsByMonth?.celebInfo);
    setPages(data?.searchCelebsByMonth?.pages || 0);
  };

  const [searchCelebsByMonth] = useSearchCelebsByMonth(onCompletedMonth);
  const [searchCelebs] = useSearchCelebs(onCompleted);

  const thisMonth = () => {
    const newDate = new Date();
    return newDate.getMonth();
  };
  useEffect(() => {
    const roleList: { [key: string]: boolean } = {};
    Roles.map((role) =>
      roles.includes(role.name)
        ? (roleList[role.role] = true)
        : (roleList[role.role] = false)
    );
    month
      ? searchCelebsByMonth({
          variables: {
            input: {
              query: name,
              month: thisMonth(),
              page: currentPage - 1,
              ...roleList,
            },
          },
        })
      : searchCelebs({
          variables: {
            input: {
              query: name,
              page: currentPage - 1,
              ...roleList,
            },
          },
        });
  }, [roles, name, currentPage]);
  return (
    <div>
      <div className="grid gap-6 tablet:grid-flow-col grid-flow-row laptop:mb-12 mb-4 desktop:w-4/5 w-full">
        <SearchBar
          placeholder="Search by name"
          onChange={(event) => setName(event.target.value)}
        />
        <Filter useAll items={roleItems} setList={setRoles} />
      </div>
      <div
        style={{ maxHeight: `${half ? `300px` : ``}` }}
        className={`my-6 overflow-y-auto flex flex-col justify-center`}
      >
        <CardGrid celebList={celebList} gridCols={half ? 3 : undefined} />
        <PageIndex pages={pages} usePage={[currentPage, setCurrentPage]} />
      </div>
    </div>
  );
};
