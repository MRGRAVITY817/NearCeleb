import { useEffect, useState } from "react";
import { CelebsByName } from "../../../../__generated__/CelebsByName";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import { useGetCelebsByName } from "../../../../hooks/graphql/celeb/useGetCelebsByName";

interface NameSearchProps {
  // FIXME: Need to make celebList type!
  setCelebList: (celebList: any) => void;
}
export const NameSearch: React.FC<NameSearchProps> = ({ setCelebList }) => {
  const onCompleted = (data: CelebsByName) => {
    setCelebList(data?.searchCelebByName.celebs);
    console.log(data?.searchCelebByName);
  };
  const [celebByNameQuery] = useGetCelebsByName(onCompleted);
  const nameSearch = (query: string) =>
    celebByNameQuery({
      variables: {
        input: {
          query,
        },
      },
    });

  return (
    <SearchBar
      placeholder="Search by name"
      onChange={(event) => nameSearch(event.target.value)}
    />
  );
};
