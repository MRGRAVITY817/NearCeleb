import { MailList } from "../components/specific/Postbox/organisms";
import { PostboxPageTemplate } from "../components/specific/Postbox/templates";

const Postbox = () => {
  return (
    <div>
      <PostboxPageTemplate mailList={<MailList />} />
    </div>
  );
};

export default Postbox;
