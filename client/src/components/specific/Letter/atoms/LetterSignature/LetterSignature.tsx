import { useReactiveVar } from "@apollo/client";
import { letterPaperVar, letterSignatureVar } from "../../reactiveVars";
import { useMe } from "../../../../../hooks/graphql/auth/useMe";

export const LetterSignature = () => {
  const signature = useReactiveVar(letterSignatureVar);
  const paper = useReactiveVar(letterPaperVar);
  const { data, loading } = useMe();
  return (
    <>
      {loading ? (
        <p>Loading signature...</p>
      ) : (
        <img
          src={data?.me.userInfo?.signature || ""}
          alt="signature"
          className={`transition-all object-contain absolute bottom-0 right-0 
                    ${signature ? `opacity-100` : `opacity-0`}
										${paper === "postcard" ? `w-1/12` : `w-1/6`}`}
        />
      )}
    </>
  );
};
