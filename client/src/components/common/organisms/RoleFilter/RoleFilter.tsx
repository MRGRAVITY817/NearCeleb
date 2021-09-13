import { React } from "@ungap/global-this";
import { useEffect, useState } from "react";
import { useGetCelebsByRole } from "../../../../hooks/graphql/celeb/useGetCelebsByRole";
import { Roles } from "../../../../lib/celeb-filter";
import { CelebsByRole } from "../../../../__generated__/CelebsByRole";
import { Filter } from "../../molecules/Filter/Filter";

interface RoleFilterProps {
  // FIXME: Need to make celebList type!
  setCelebList: (celebList: any) => void;
}

const roleItems = Roles.map((role) => role.name);

export const RoleFilter: React.FC<RoleFilterProps> = ({ setCelebList }) => {
  const [list, setList] = useState<string[]>([]);
  const onCompleted = (data: CelebsByRole) => {
    setCelebList(data.getCelebsByRole.celebs);
  };
  const [celebByTagQuery] = useGetCelebsByRole(onCompleted);
  useEffect(() => {
    const query: { [key: string]: boolean } = {};
    Roles.map((role) =>
      list.includes(role.name)
        ? (query[role.role] = true)
        : (query[role.role] = false)
    );
    celebByTagQuery({
      variables: {
        input: query,
      },
    });
  }, [list, celebByTagQuery]);
  return <Filter useAll items={roleItems} setList={setList} />;
};
