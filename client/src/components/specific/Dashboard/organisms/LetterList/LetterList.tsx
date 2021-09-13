import { useGetLettersByUser } from "../../../../../hooks/graphql/letter/useGetLettersByUser";
import { DashboardContainer } from "../../molecules";

export const LetterList = () => {
  const { data, loading } = useGetLettersByUser();
  const letters = data?.getLettersByUser?.letters;
  return (
    <DashboardContainer
      header={`Postbox`}
      contents={
        <div className="grid gap-6 grid-cols-3">
          {letters?.map((letter, index) => (
            <img
              key={index}
              src={letter.previewImage!}
              alt={letter.contents?.heading!}
              className="border-1 shadow-md"
            />
          ))}
        </div>
      }
      loading={loading}
    />
  );
};
