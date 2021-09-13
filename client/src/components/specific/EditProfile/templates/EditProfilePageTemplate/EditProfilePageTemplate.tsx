import { ReactChild } from "react";
import Head from "next/head";
import { Button, Container } from "../../../../common/atoms";

interface EditProfilePageTemplateProps {
  userNameField: ReactChild;
  birthDateField: ReactChild;
  profileImageField: ReactChild;
  profileStateField: ReactChild;
  descriptionField: ReactChild;
  coverImageField: ReactChild;
  signatureField: ReactChild;
  cancel: ReactChild;
  confirm: ReactChild;
  loading?: boolean;
}

export const EditProfilePageTemplate: React.FC<EditProfilePageTemplateProps> = ({
  userNameField,
  birthDateField,
  profileImageField,
  profileStateField,
  descriptionField,
  coverImageField,
  signatureField,
  cancel,
  confirm,
  loading = false,
}) => {
  return (
    <div>
      <Head>
        <title>Home | Near Celeb</title>
      </Head>
      <div className="grid gap-4 grid-cols-1 laptop:pb-12 pb-4 laptop:px-12 px-4">
        <Container bgColor="white">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="relative flex flex-col items-center justify-center">
              {coverImageField}
              {profileImageField}
              <div className="py-4 w-3/5">
                <div className="flex items-start justify-between">
                  <div className="w-2/3">
                    <h1 className="laptop:text-3xl text-xl font-bold">
                      {userNameField}
                    </h1>
                    <h2 className="mt-2 laptop:mt-4 text-lg laptop:text-xl">
                      {profileStateField}
                    </h2>
                    <p className="text-md mt-2 laptop:mt-4 laptop:text-lg">
                      {descriptionField}
                    </p>
                  </div>
                  <div className={`grid gap-x-4 grid-cols-2 w-1/3`}>
                    {birthDateField}
                  </div>
                </div>
                <div className="my-4 border-b-1 border-container border-opacity-50"></div>
                <div className="flex items-center justify-between w-full">
                  <div className="w-1/3">{signatureField}</div>
                  <div className="grid gap-8 grid-cols-1 w-1/3">
                    {cancel}
                    {confirm}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
