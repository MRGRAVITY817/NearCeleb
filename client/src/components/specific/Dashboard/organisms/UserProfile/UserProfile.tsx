import { Button, Container } from "../../../../common/atoms";
import { useMe } from "../../../../../hooks/graphql/auth/useMe";
import { useRouter } from "next/dist/client/router";
import { useReactiveVar } from "@apollo/client";
import { updateProfileVar } from "../../../../../pages/edit-profile";
import { useEffect } from "react";

interface UserProfileProps {
  isMe?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isMe = false }) => {
  const { data, loading, refetch } = useMe();
  const router = useRouter();
  const updateProfile = useReactiveVar(updateProfileVar);
  useEffect(() => {
    if (updateProfile) {
      refetch();
      updateProfileVar(false);
    }
  }, [updateProfile]);
  console.log(data?.me.userInfo);
  return (
    <Container bgColor="white">
      {loading ? (
        <h1 className="m-12 laptop:text-2xl text-xl">Loading...</h1>
      ) : (
        <div className="relative flex flex-col items-center justify-center">
          <img
            src={data?.me.userInfo?.coverImage || ""}
            alt=""
            className="w-full h-32 laptop:h-60 laptop:rounded-t-md rounded-t-sm object-cover object-center"
          />
          <img
            src={data?.me.userInfo?.profileImage || "/noImage/maleNoImage.svg"}
            alt="UserProfileImage"
            className="absolute laptop:left-28 laptop:top-32 top-8 flex justify-center w-32 laptop:w-44 h-32 laptop:h-44 bg-container rounded-full shadow-md object-cover"
          />
          <div className="py-4 laptop:w-1/2 w-5/6">
            <div className="flex flex-col laptop:flex-row laptop:items-start laptop:justify-between justify-center">
              <div className="laptop:mt-4 mt-8 laptop:w-2/3 w-full text-center laptop:text-left">
                <h1 className="laptop:text-3xl text-xl font-bold">
                  {data?.me.userInfo?.userName}
                </h1>
                <h2 className="mt-2 laptop:mt-4 text-lg laptop:text-xl">
                  {data?.me.userInfo?.profileState || ""}
                </h2>
                <p className="text-md mt-2 laptop:mt-4 laptop:text-lg font-light">
                  {data?.me.userInfo?.description || ""}
                </p>
              </div>
              <div
                className={`grid gap-x-4 ${
                  isMe ? `grid-cols-1` : `grid-cols-2`
                } laptop:w-1/3 w-full laptop:mt-4 mt-8`}
              >
                {isMe ? (
                  <Button
                    onClick={() => router.push("/edit-profile")}
                    color="container"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button color="container" disabled>
                      Follow
                    </Button>
                    <Button color="container">Message</Button>
                  </>
                )}
              </div>
            </div>
            <div className="my-4 border-b-1 border-container border-opacity-50"></div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg laptop:text-xl">Feed</h1>
              <h1 className="text-lg laptop:text-xl">Postbox</h1>
              <h1 className="text-lg laptop:text-xl">News</h1>
              <h1 className="text-lg laptop:text-xl">Activity</h1>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
