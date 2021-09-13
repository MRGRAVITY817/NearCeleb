import Head from "next/head";
import { ReactChild } from "react";
import { AdminCelebFormProps } from "../../interface";

interface AddCelebPageTemplateProps extends AdminCelebFormProps {
  clear: ReactChild;
  addCeleb: ReactChild;
}

export const AddCelebPageTemplate: React.FC<AddCelebPageTemplateProps> = ({
  ...props
}) => {
  return (
    <div>
      <Head>
        <title>Add Celeb | Near Celeb</title>
      </Head>
      <div className="laptop:pb-12 pb-4 laptop:px-12 px-4">
        <div className="grid gap-0 laptop:gap-12 grid-cols-1 laptop:grid-cols-2 mb-4 laptop:mb-8">
          <div className="grid gap-2 grid-flow-row">
            {props.celebProfileImageField}
            {props.celebRolesField}
            {props.celebGenderField}
            {props.celebDescriptionField}
          </div>
          <div className="grid gap-2 grid-flow-row">
            {props.celebKorNameField}
            {props.celebEngNameField}
            {props.celebRealNameField}
            {props.celebCompanyField}
            {props.celebGroupField}
            {props.celebBirthDateField}
            {props.celebDebutDateField}
            {props.celebNationalityField}
          </div>
        </div>
        <div className="grid gap-4 laptop:grid-flow-col grid-flow-row">
          {props.clear}
          {props.addCeleb}
        </div>
      </div>
    </div>
  );
};
