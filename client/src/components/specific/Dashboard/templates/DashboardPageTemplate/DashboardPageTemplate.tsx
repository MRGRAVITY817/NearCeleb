import { ReactChild } from "react";
import Head from "next/head";

interface DashboardPageTemplateProps {
  userProfile: ReactChild;
  followingList: ReactChild;
  letterList: ReactChild;
  userActivity: ReactChild;
  signature: ReactChild;
}

export const DashboardPageTemplate: React.FC<DashboardPageTemplateProps> = ({
  userProfile,
  followingList,
  letterList,
  userActivity,
  signature,
}) => {
  return (
    <div>
      <Head>
        <title>Dashboard | Near Celeb</title>
      </Head>
      <div className="grid gap-4 grid-cols-1 laptop:pb-12 pb-4 laptop:px-12 px-4">
        {userProfile}
        <div className="flex flex-col-reverse laptop:flex-row items-start justify-between transition-all">
          <div className="grid gap-4 tablet:grid-flow-col grid-flow-row laptop:grid-flow-row mr-4 laptop:mt-0 mt-4 laptop:w-1/5 w-full">
            {followingList}
            {signature}
          </div>
          <div className="grid gap-4 grid-flow-row laptop:w-4/5 w-full">
            {letterList}
            {userActivity}
          </div>
        </div>
      </div>
    </div>
  );
};
