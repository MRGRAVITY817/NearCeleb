import { useMe } from "../../../../../hooks/graphql/auth/useMe";
import { DashboardContainer } from "../../molecules";

export const UserSignature = () => {
  const { data, loading } = useMe();
  return (
    <DashboardContainer
      header="Signature"
      contents={<img src={data?.me.userInfo?.signature || ""} alt="" />}
      loading={loading}
    />
  );
};
