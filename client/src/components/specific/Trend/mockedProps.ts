import { TrendCategory } from "../../../__generated__/globalTypes";
import { ImageCardProps } from "../../common/molecules/ImageCard/ImageCard";

interface MockedTrendImageItemProps extends ImageCardProps {
  category: TrendCategory;
}

export const mockedTrendImageList: MockedTrendImageItemProps[] = [
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/movieTrend.jpg",
    description:
      "After another bloody good season of Kingdom, fans will be even more ravenous to see the Korean horror series return for a third. We’re still waiting for Netflix to confirm that a third season is happening, but we can look forward to the one-hour special episode “Ashin of the North” which arrives July 2021",
    category: TrendCategory.Movie,
  },
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/musicTrend.jpg",
    description:
      "Brave Girls, a girl group that rose to surprise stardom at the brink of disbandment, said it wishes to become the new summer queen of the K-pop scene with its latest release.",
    category: TrendCategory.Music,
  },
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/comedyTrend.png",
    description:
      "Hangout with Yoo (Korean: 놀면 뭐하니?; lit. How Do You Play?) is a South Korean reality show program on MBC. It airs on MBC starting from July 27, 2019 on Saturdays at 18:30 (KST). The show lasts 1 hour and 25 minutes, and is divided into 1 and 2 parts.",
    category: TrendCategory.Comedy,
  },
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/tvshowTrend.jpg",
    description:
      "The Penthouse: War in Life (Korean: 펜트하우스; RR: Penteuhauseu; lit. Penthouse) is a South Korean television series starring Lee Ji-ah, Kim So-yeon, Eugene, Um Ki-joon, Yoon Jong-hoon, and Park Eun-seok.",
    category: TrendCategory.TvShow,
  },
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/sportsTrend.jpg",
    description:
      "Football at the Summer Olympics has been included in every Summer Olympic Games as a men's competition sport, except 1896 and 1932. Women's football was added to the official program at the 1996 Atlanta Games.",
    category: TrendCategory.Sports,
  },
  {
    cardImage:
      "https://kr.object.ncloudstorage.com/nearceleb-dev-trends/mock/esportsTrend.jpg",
    description:
      "The Unified Grand Prix is the first of three Tier 1 Partnered Organizer Tournaments in collaboration with Riot Games to feed into the Proving Grounds Tournament. Its purpose is to promote new talents within the North American League of Legends community and provide the community with an accessible and inclusive circuit made by multiple team-based competitive formats.",
    category: TrendCategory.ESports,
  },
];
