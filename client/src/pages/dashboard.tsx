import {
  FollowingList,
  LetterList,
  UserSignature,
  UserActivity,
  UserProfile,
} from "../components/specific/Dashboard/organisms";
import { DashboardPageTemplate } from "../components/specific/Dashboard/templates";
import { useMe } from "../hooks/graphql/auth/useMe";

const Dashboard = () => {
  const { data, loading } = useMe();
  return (
    <>
      {loading ? (
        <div className="text-4xl">
          <h1>Loading...</h1>
        </div>
      ) : (
        <DashboardPageTemplate
          userProfile={<UserProfile isMe />}
          followingList={<FollowingList userId={data?.me.id!} />}
          letterList={<LetterList />}
          userActivity={<UserActivity />}
          signature={<UserSignature />}
        />
      )}
    </>
  );
};

export default Dashboard;
