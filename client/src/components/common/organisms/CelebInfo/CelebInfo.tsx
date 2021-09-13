import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { RiQuillPenLine } from "react-icons/ri";
import { useGetCelebInfo } from "../../../../hooks/graphql/celeb/useGetCelebById";
import { useIsFollowing } from "../../../../hooks/graphql/follow/useIsFollowing";
import { useToggleFollow } from "../../../../hooks/graphql/follow/useToggleFollow";
import { prettyDate } from "../../../../lib/dateUtils";
import { UseState } from "../../../../lib/types/hooks";
import { windowConfirm } from "../../../../lib/windowUtils";
import { Gender } from "../../../../__generated__/globalTypes";
import {
  letterCelebIdVar,
  letterCelebNameVar,
} from "../../../specific/Letter/reactiveVars";
import { PopUp } from "../../atoms";
import { Button } from "../../atoms/Button/Button";

export interface CelebInfoProps {
  celebId: number;
  useOpen: UseState<boolean>;
}

export const CelebInfo: React.FC<CelebInfoProps> = ({ celebId, useOpen }) => {
  const { data, loading } = useGetCelebInfo(celebId);
  const celebData = data?.getCelebById?.celebInfo;
  const roleArray = Object.entries(celebData?.roles || {}).filter(
    (ent) => ent[0] !== "__typename" && ent[1] === true
  );
  const router = useRouter();
  const writeLetter = (engName: string, celebId: number) => {
    windowConfirm({
      message: `Write letter to ${engName}?`,
      noMessage: "No, stay here",
      noCallback: () => {},
      yesMessage: "Yes, head to letter page",
      yesCallback: () => {
        letterCelebIdVar(celebId);
        letterCelebNameVar(engName);
        router.push("/letter");
      },
    });
  };
  const { data: fData, loading: fLoading } = useIsFollowing(celebId);
  const [following, setFollowing] = useState<boolean>(
    fData?.isFollowing?.isFollowing || false
  );
  const [toggleFollowMutation] = useToggleFollow();
  const toggleFollow = () => {
    toggleFollowMutation({ variables: { input: { celebId } } });
    setFollowing(!following);
  };
  useEffect(() => {
    !fLoading && setFollowing(fData?.isFollowing?.isFollowing!);
  }, [fLoading, fData]);
  return (
    <PopUp useOpen={useOpen}>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="grid laptop:gap-24 gap-4 grid-cols-1 laptop:grid-cols-2 items-start justify-center laptop:p-8 w-72 tablet:w-96 laptop:w-auto bg-white">
          <div className="flex flex-col items-center justify-around">
            <img
              src={celebData?.profileImage || ""}
              alt={celebData?.engName || "Failed to load image"}
              onError={(event) => {
                event.currentTarget.src =
                  celebData?.gender == Gender.Male
                    ? `/noImage/maleNoImage.svg`
                    : `/noImage/femaleNoImage.svg`;
              }}
              className="laptop:mb-12 mb-4 w-40 h-40 bg-gradient-to-r rounded-full from-main to-main via-container object-cover object-top"
            />
            <div className="grid gap-1 laptop:gap-4 grid-flow-row grid-cols-1 w-full">
              <Button
                onClick={() =>
                  celebData?.engName &&
                  writeLetter(celebData?.engName, celebData?.id)
                }
                color="main"
              >
                <div className="flex items-center justify-between w-24">
                  <div className="w-1/2">
                    <RiQuillPenLine className="text-white" />
                  </div>
                  <h1 className="w-1/2 text-left text-white">Letter</h1>
                </div>
              </Button>
              <Button
                color={following ? `strong` : `main`}
                onClick={() => toggleFollow()}
              >
                <div className="flex items-center justify-between w-24">
                  <div className="w-1/2">
                    <AiOutlineHeart className="text-white" />
                  </div>
                  <h1 className="w-1/2 text-left text-white">
                    {following ? `Following` : `Follow`}
                  </h1>
                </div>
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-start mb-4 laptop:mb-8">
              {roleArray.map((role) => (
                <img
                  key={role[0]}
                  src={`/role-icon/${role[0]}-icon.svg`}
                  alt={`${celebData?.engName}-${role[0]}`}
                  className="mr-2 laptop:mr-4 w-12 laptop:w-16 h-12 laptop:h-16"
                />
              ))}
            </div>
            <div className="text-md grid gap-2 laptop:gap-4 grid-flow-row grid-cols-2 text-main tablet:text-lg laptop:text-xl">
              <>
                <h1>Korean Name</h1>
                <p>{celebData?.korName}</p>
              </>
              <>
                <h1>English Name</h1>
                <p>{celebData?.engName}</p>
              </>
              <>
                <h1>Birth Date</h1>
                <p>{prettyDate(celebData?.birthDate)}</p>
              </>
              <h1>Debut Date</h1>
              <p>{prettyDate(celebData?.debutDate)}</p>
              <>
                <h1>Company</h1>
                <p>{celebData?.company || `N/A`}</p>
              </>
            </div>
          </div>
        </div>
      )}
    </PopUp>
  );
};
