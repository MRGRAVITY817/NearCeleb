import { useGetLettersByUser } from "../../../../../hooks/graphql/letter/useGetLettersByUser";

export const MailList = () => {
  const { data, loading } = useGetLettersByUser();
  const letters = data?.getLettersByUser?.letters;
  return (
    <div className="grid gap-6 grid-cols-3">
      {letters
        ? letters.map((letter, index) => (
            <div key={index}>
              <img src={letter.previewImage || ""} alt={`userLetter${index}`} />
            </div>
          ))
        : null}
    </div>
  );
};
