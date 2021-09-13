import { BirthdayHeader } from "../../molecules/BirthdayHeader/BirthdayHeader";
import { BirthdaySlide } from "../BirthdaySlide/BirthdaySlide";

export type CelebRole =
  | "actor"
  | "artist"
  | "author"
  | "comedian"
  | "showhost"
  | "influencer"
  | "sports";

export const BirthdaySlider = () => {
  return (
    <div>
      <BirthdayHeader />
      <BirthdaySlide />
    </div>
  );
};
