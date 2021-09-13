import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useGetFollowingByUser } from "../../../../../hooks/graphql/follow/useGetFollowingByUser";
import { useToggleFollow } from "../../../../../hooks/graphql/follow/useToggleFollow";
import { windowAlert, windowConfirm } from "../../../../../lib/windowUtils";
import { ToggleFollow } from "../../../../../__generated__/ToggleFollow";
import { updateCelebCardVar } from "../../../../common/molecules/CelebCard/CelebCard";
import { DashboardContainer } from "../../molecules";

export const updateFollowingListVar = makeVar(false);

interface FollowingListProps {
  userId: number;
}

export const FollowingList: React.FC<FollowingListProps> = ({ userId }) => {
  const updateFollowingList = useReactiveVar(updateFollowingListVar);
  const { data, loading, refetch } = useGetFollowingByUser(userId);
  const onCompleted = (data: ToggleFollow) => {
    const { ok, error } = data.toggleFollow;
    if (!ok) {
      windowAlert({
        message: "Ooops... I think Near celeb is kinda busy.\nTry later!",
      });
      console.log(error);
    }
    refetch();
    updateCelebCardVar(true);
  };
  const [unFollowMutation] = useToggleFollow(onCompleted);
  const unFollow = (celebId: number) => {
    windowConfirm({
      message: "Unfollow celeb?",
      noMessage: "No, my list is fine.",
      yesMessage: "Yes... time to say bye-bye.",
      yesCallback: () =>
        unFollowMutation({ variables: { input: { celebId } } }),
    });
  };
  useEffect(() => {
    if (updateFollowingList) {
      refetch();
    }
  }, [updateFollowingList]);
  return (
    <DashboardContainer
      header={`Following ${
        data?.getFollowingByUser.followingCount || 0
      } celebs`}
      contents={
        <div>
          {data?.getFollowingByUser.following?.map((f, index) => (
            <div key={index} className="flex items-center justify-between my-4">
              <div className="flex items-center justify-start">
                <img
                  src={f.celebInfo?.profileImage || ""}
                  alt={f.celebInfo?.engName}
                  className="w-12 h-12 bg-main rounded-full object-cover object-top"
                  onError={(event) => {
                    event.currentTarget.src = `/noImage/maleNoImage.svg`;
                  }}
                />
                <h1 className="ml-4 text-lg">{f.celebInfo?.engName}</h1>
              </div>
              <button
                onClick={() => {
                  f.celebInfo?.id ? unFollow(f.celebInfo?.id) : null;
                }}
                className="text-strong text-2xl focus:outline-none"
              >
                <BsHeartFill />
              </button>
            </div>
          ))}
        </div>
      }
      loading={loading}
    />
  );
};
