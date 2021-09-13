import { PartnerBodyContainer } from "../../molecules";

interface Partner {
  partner: string;
  logo: string;
}

const GovermentPartners: Partner[] = [
  {
    partner: "중소벤처기업부",
    logo: "https://www.mss.go.kr/images/smba/mi/img_miVisual.jpg",
  },
  {
    partner: "NIPA",
    logo: "https://www.nipa.kr/site/main/images/contents/cts204_mark.png",
  },
  { partner: "AI hub", logo: "https://aihub.or.kr/images/logo-aihub.png" },
  { partner: "NIA", logo: "https://www.nia.or.kr/img/nia_kor/ci_01_01.png" },
  { partner: "GBSA", logo: "https://www.gbsa.or.kr/images/site/main/logo.png" },
];

const SupportPartners: Partner[] = [
  { partner: "Naver Cloud Platform", logo: "/partners/ncp.png" },
  {
    partner: "SK Cloud-Z",
    logo: "https://www.cloudz.co.kr/images/common/h1_logo.png",
  },
];

const JoinPartners: Partner[] = [
  { partner: "Edutem", logo: "/partners/edutem.jpeg" },
];

const FundPartners: Partner[] = [
  {
    partner: "Lauchpad",
    logo:
      "https://besuccess.com/wp-content/uploads/2019/09/beSUCCESS-20190926-LaunchPad2019-Thumb.jpg",
  },
  {
    partner: "Awesome Ventures",
    logo:
      "https://image.rocketpunch.com/company/79624/awesome-ventures_logo_1528437227.png?s=400x400&t=inside",
  },
  {
    partner: "Maria 01",
    logo:
      "https://thehub-io.imgix.net/files/s3/20210219120957-b787598cf3d8346db7cf150cd4561237.jpg?fit=crop&w=300&h=300&q=60",
  },
];

export const PartnerBody = () => {
  return (
    <div className="grid gap-4 laptop:gap-8 grid-flow-row">
      <PartnerBodyContainer
        bgImage="https://images.unsplash.com/photo-1517868674985-0525518ae392?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        title="Goverment"
        logos={GovermentPartners.map((gp) => gp.logo)}
      />
      <PartnerBodyContainer
        bgImage="https://images.unsplash.com/photo-1554435493-93422e8220c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
        title="Support"
        logos={SupportPartners.map((sp) => sp.logo)}
      />
      <PartnerBodyContainer
        bgImage="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        title="Join"
        logos={JoinPartners.map((jp) => jp.logo)}
      />
      <PartnerBodyContainer
        bgImage="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        title="Fund"
        logos={FundPartners.map((fp) => fp.logo)}
      />
    </div>
  );
};
