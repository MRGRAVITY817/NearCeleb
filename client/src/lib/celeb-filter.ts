// Styles for filter
export const baseStyle =
  "mx-12 my-2 py-1 font-normal text-white shadow-lg rounded-xl text-xl focus:outline-none";
export const blankFilterStyle =
  "mx-12 my-2 px-3 py-1 font-light text-xl transition-all focus:outline-none text-gray-600 hover:font-medium hover:text-pink-800";
export const filledFilterStyle =
  "mx-12 my-2 px-3 py-1 font-normal text-white bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-300 shadow-lg rounded-xl text-xl focus:outline-none";
// Filter tag object
export interface IFilterTags {
  name: string;
  role: string;
}
// Iterable role array
export const Roles: IFilterTags[] = [
  {
    name: "Actor",
    role: "actor",
  },
  {
    name: "Artist",
    role: "artist",
  },
  {
    name: "Comedian",
    role: "comedian",
  },
  {
    name: "Show Host",
    role: "showhost",
  },
  {
    name: "Sports",
    role: "sports",
  },
  {
    name: "Author",
    role: "author",
  },
  {
    name: "Influencer",
    role: "influencer",
  },
];
