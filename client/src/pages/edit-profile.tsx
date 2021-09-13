import { makeVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/atoms";
import {
  BirthDateField,
  Cancel,
  CoverImageField,
  DescriptionField,
  ProfileImageField,
  ProfileStateField,
  SignatureField,
  UserNameField,
} from "../components/specific/EditProfile/molecules";
import { EditProfilePageTemplate } from "../components/specific/EditProfile/templates";
import { useMe } from "../hooks/graphql/auth/useMe";
import { useEditProfile } from "../hooks/graphql/user/useEditProfile";
import { uploadFile } from "../lib/fileUtils";
import { windowAlert, windowConfirm } from "../lib/windowUtils";
import { EditUserInfo } from "../__generated__/EditUserInfo";

interface EditProfileForm {
  userName: string;
  description: string;
  profileState: string;
  birthDate: Date;
  profileImage: File;
  coverImage: File;
  signature: File;
}

const isStringNull = (data: string) => {
  return data.length > 0 ? data : null;
};

export const updateProfileVar = makeVar<boolean>(false);

const EditProfile = () => {
  const { data, loading } = useMe();
  const { control, register, getValues } = useForm<EditProfileForm>({
    mode: "onBlur",
  });
  const router = useRouter();
  const onCompleted = (data: EditUserInfo) => {
    const { ok, error } = data.editUserInfo;
    if (!ok) {
      windowAlert({
        message: "Failed to edit profile. Must be server issue. Try it later!",
      });
      console.log(error);
      return;
    }
    windowAlert({
      message: "Profile updated successfully.",
      alertCallback: () => {
        updateProfileVar(true);
        router.push("/dashboard");
      },
    });
  };
  const [editProfileMutation, { loading: editProfileLoading }] = useEditProfile(
    onCompleted
  );
  const editProfile = async () => {
    const { profileState, description, userName, birthDate } = getValues();
    let coverImage: string | undefined;
    let profileImage: string | undefined;
    let signature: string | undefined;
    if (getValues().coverImage) {
      const {
        ok: coverImageOk,
        error: coverImageError,
        url,
      } = await uploadFile({
        file: getValues().coverImage,
        endpoint: `users/cover-image`,
      });
      if (!coverImageOk) {
        windowAlert({
          message: coverImageError || "Cannot upload cover image. Try again.",
        });
        return;
      }
      coverImage = url;
    }
    if (getValues().profileImage) {
      const {
        ok: profileImageOk,
        error: profileImageError,
        url,
      } = await uploadFile({
        file: getValues().profileImage,
        endpoint: `users/profile-image`,
      });
      if (!profileImageOk) {
        windowAlert({
          message:
            profileImageError || "Cannot upload profile image. Try again.",
        });
        return;
      }
      profileImage = url;
    }
    if (getValues().signature) {
      const { ok: signatureOk, error: signatureError, url } = await uploadFile({
        file: getValues().signature,
        endpoint: `users/signature`,
      });
      if (!signatureOk) {
        windowAlert({
          message: signatureError || "Cannot upload signature. Try again.",
        });
        return;
      }
      signature = url;
    }
    editProfileMutation({
      variables: {
        input: {
          userName: isStringNull(userName),
          profileState: isStringNull(profileState),
          description: isStringNull(description),
          birthDate: birthDate,
          coverImage,
          profileImage,
          signature,
        },
      },
    });
  };
  return (
    <EditProfilePageTemplate
      loading={loading}
      profileImageField={
        <ProfileImageField
          before={data?.me.userInfo?.profileImage || "/noImage/maleNoImage.svg"}
          control={control}
          name="profileImage"
        />
      }
      profileStateField={
        <ProfileStateField
          before={data?.me.userInfo?.profileState || "Add Profile State"}
          register={register("profileState", { maxLength: 50 })}
        />
      }
      descriptionField={
        <DescriptionField
          before={data?.me.userInfo?.description || "Tell us about yourself!"}
          register={register("description", { maxLength: 150 })}
        />
      }
      coverImageField={
        <CoverImageField
          before={data?.me.userInfo?.coverImage || "/noImage/addCoverImage.svg"}
          control={control}
          name="coverImage"
        />
      }
      userNameField={
        <UserNameField
          before={data?.me.userInfo?.userName || "Add Username"}
          register={register("userName", { maxLength: 20 })}
        />
      }
      birthDateField={
        <BirthDateField
          control={control}
          name="birthDate"
          before={new Date()}
        />
      }
      signatureField={
        <SignatureField
          before={data?.me.userInfo?.signature || "/noImage/addSignature.svg"}
          control={control}
          name="signature"
        />
      }
      cancel={<Cancel />}
      confirm={
        <Button
          onClick={() =>
            windowConfirm({
              message: "Update profile?",
              noMessage: "Wait, I'm not done yet.",
              yesMessage: "Yes, I'd like to.",
              yesCallback: () => editProfile(),
            })
          }
          color="container"
        >
          Confirm
        </Button>
      }
    />
  );
};

export default EditProfile;
