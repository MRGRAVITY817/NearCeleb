import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { Button } from "../../components/common/atoms";
import {
  DateField,
  ImageField,
  OptionField,
  TextAreaField,
  TextField,
} from "../../components/common/molecules";
import { CheckField } from "../../components/common/molecules/CheckField/CheckField";
import { AddCelebPageTemplate } from "../../components/specific/Admin/Celeb/templates/AddCelebPageTemplate/AddCelebPageTemplate";
import { useCreateCeleb } from "../../hooks/graphql/celeb/useCreateCeleb";
import { Roles } from "../../lib/celeb-filter";
import { arrayToBooleanObject } from "../../lib/common";
import { uploadFile } from "../../lib/fileUtils";
import { windowAlert, windowConfirm } from "../../lib/windowUtils";
import { CreateCelebMutation } from "../../__generated__/CreateCelebMutation";
import { Country, Gender } from "../../__generated__/globalTypes";

interface AddCelebForm {
  korName: string;
  engName: string;
  realName: string;
  company: string;
  group: string;
  description: string;
  gender: string;
  roles: string[];
  nationality: string;
  birthDate: Date;
  debutDate: Date;
  profileImage: File;
}

const AddCeleb = () => {
  const router = useRouter();
  const { register, getValues, control, reset } = useForm<AddCelebForm>({
    mode: "onBlur",
  });
  const onCompleted = (data: CreateCelebMutation) => {
    const { ok, error } = data.createCeleb;
    if (!ok || error) {
      windowAlert({
        message: error || "Failed to add celeb. Try again later.",
      });
      return;
    }
    windowConfirm({
      message: "Celeb info added. Shall we see the Celebpedia?",
      noMessage: "No, I will stay here.",
      noCallback: () => reset(),
      yesMessage: "Yes, let's go!",
      yesCallback: () => router.push(`/celebpedia/id`),
    });
  };
  const [addCelebMutation, { loading }] = useCreateCeleb(onCompleted);
  const addCeleb = async () => {
    const { gender, roles, nationality, profileImage, ...info } = getValues();
    const { ok, error, url } = await uploadFile({
      file: profileImage,
      endpoint: "celebs/profile-image",
    });
    if (!ok || error) {
      windowAlert({
        message: error || "Failed to add celeb. Try again later.",
      });
      return;
    }
    addCelebMutation({
      variables: {
        input: {
          profileImage: url,
          gender: gender as Gender,
          nationality: nationality as Country,
          roles: arrayToBooleanObject(roles),
          ...info,
        },
      },
    });
  };
  const clearAll = () => {
    windowConfirm({
      message: "Clear all the info?",
      noMessage: "No, don't.",
      yesMessage: "Yes, clear them all.",
      yesCallback: () => reset(),
    });
  };
  return (
    <div>
      <AddCelebPageTemplate
        celebBirthDateField={
          <DateField
            fieldName="Birth Date"
            name="birthDate"
            control={control}
          />
        }
        celebDebutDateField={
          <DateField
            fieldName="Debut Date"
            name="debutDate"
            control={control}
          />
        }
        celebCompanyField={
          <TextField
            fieldName="Company"
            placeholder="Add company"
            register={register("company")}
          />
        }
        celebDescriptionField={
          <TextAreaField
            fieldName="Description"
            placeholder="Add Description"
            register={register("description")}
          />
        }
        celebEngNameField={
          <TextField
            fieldName="English Name"
            placeholder="ex) Harry Potter, Ronald Weasley, etc"
            required
            register={register("engName", {
              required: "English name is required",
            })}
          />
        }
        celebKorNameField={
          <TextField
            fieldName="Korean Name"
            placeholder="ex) 해리 포터, 론 위즐리, etc"
            required
            register={register("korName", {
              required: "Korean name is required",
            })}
          />
        }
        celebRealNameField={
          <TextField
            fieldName="Real Name"
            placeholder="Add real name"
            register={register("realName")}
          />
        }
        celebProfileImageField={
          <ImageField
            fieldName="Profile Image"
            name="profileImage"
            control={control}
            mode="portrait"
            required
          />
        }
        celebGenderField={
          <OptionField
            fieldName="Gender"
            required
            options={["Male", "Female"]}
            register={register("gender")}
          />
        }
        celebGroupField={
          <TextField
            fieldName="Group"
            placeholder="Add group name"
            register={register("group")}
          />
        }
        celebRolesField={
          <CheckField
            fieldName="Roles"
            control={control}
            name="roles"
            checkList={Roles.map((item) => item.role)}
            required
          />
        }
        celebNationalityField={
          <OptionField
            fieldName="Nationality"
            required
            options={Object.entries(Country).map((v) => v[0])}
            register={register("nationality")}
          />
        }
        clear={<Button onClick={() => clearAll()}>Clear</Button>}
        addCeleb={
          <Button
            disabled={loading}
            onClick={() =>
              windowConfirm({
                message: "Add celeb with given info?",
                noMessage: "No, not yet.",
                yesMessage: "Yes, add celeb.",
                yesCallback: () => addCeleb(),
              })
            }
          >
            {loading ? `Loading...` : `Add Celeb`}
          </Button>
        }
      />
    </div>
  );
};

export default AddCeleb;
