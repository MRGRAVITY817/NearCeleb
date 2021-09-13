import { makeVar, useReactiveVar } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useIsFollowing } from "../../../../hooks/graphql/follow/useIsFollowing";
import { useToggleFollow } from "../../../../hooks/graphql/follow/useToggleFollow";
import { celebsPageInfoId } from "../../../../pages/celebs";
import { Gender } from "../../../../__generated__/globalTypes";
import { ToggleFollow } from "../../../../__generated__/ToggleFollow";
import { updateFollowingListVar } from "../../../specific/Dashboard/organisms/FollowingList/FollowingList";
import { CelebInfo } from "../../organisms";

export interface CelebCardItems {
  celebId: number;
  engName: string;
  profileImage: string | null;
  birthDate: string | null;
  gender: Gender;
}

export interface CelebCardProps extends CelebCardItems {}

export const updateCelebCardVar = makeVar(false);

export const CelebCard: React.FC<CelebCardProps> = ({
  celebId,
  engName,
  profileImage,
  birthDate,
  gender,
}) => {
  const updateCelebCard = useReactiveVar(updateCelebCardVar);
  const celebBirthDate = new Date(birthDate || "");
  const { data, loading, refetch } = useIsFollowing(celebId);
  const [open, setOpen] = useState<boolean>(false);
  const onCompleted = (data: ToggleFollow) => {
    refetch();
    updateFollowingListVar(true);
  };
  const [toggleFollowMutation] = useToggleFollow(onCompleted);
  const toggleFollow = (celebId: number) => {
    toggleFollowMutation({
      variables: {
        input: {
          celebId,
        },
      },
    });
  };
  useEffect(() => {
    if (updateCelebCard) {
      refetch();
      updateCelebCardVar(false);
    }
  }, [updateCelebCard]);
  return (
    <div className="relative">
      <button
        onClick={() => toggleFollow(celebId)}
        className="absolute right-0 top-0 text-strong tablet:text-2xl laptop:text-3xl text-xl focus:outline-none transition-all"
      >
        {loading ? (
          <h1 className="text-2xl">?</h1>
        ) : data?.isFollowing.isFollowing ? (
          <BsHeartFill />
        ) : (
          <BsHeart />
        )}
      </button>
      <div
        style={{
          backgroundImage: `url(/CardImageFrame/imgFrame${
            (celebId % 5) + 1
          }.svg)`,
        }}
        className="flex justify-center bg-contain bg-bottom bg-no-repeat"
      >
        <img
          src={profileImage || "/noImage/maleNoImage.svg"}
          alt={engName}
          onError={(event) => {
            event.currentTarget.src =
              gender === Gender.Male
                ? `/noImage/maleNoImage.svg`
                : `/noImage/femaleNoImage.svg`;
          }}
          style={{ height: `14em` }}
          className="object-contain object-bottom"
        />
      </div>
      <button
        onClick={() => {
          celebsPageInfoId(celebId);
          setOpen(true);
        }}
        className="flex w-full text-center focus:outline-none"
      >
        <h1 className="p-2 w-1/5 text-main bg-white border-1 laptop:border-2 border-white laptop:rounded-l-md rounded-l-sm">
          {celebBirthDate.getDate()}
        </h1>
        <h1 className="border-r-sm laptop:border-r-md p-2 w-4/5 text-white border-1 laptop:border-2 border-white laptop:rounded-r-md rounded-r-sm">
          {engName}
        </h1>
      </button>
      <CelebInfo useOpen={[open, setOpen]} celebId={celebId} />
    </div>
  );
};
