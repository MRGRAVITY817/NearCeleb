import { ReactChild } from "react";

interface PostboxPageTemplateProps {
  mailList: ReactChild;
}
export const PostboxPageTemplate: React.FC<PostboxPageTemplateProps> = ({
  mailList,
}) => {
  return (
    <div className="p-12">
      <div className="p-12 bg-container rounded-md">{mailList}</div>
      {/* <h1 className="p-12 bg-container rounded-md">Postbox list</h1>
      <h1 className="p-12 bg-container rounded-md">Postbox list</h1>
      <h1 className="p-12 bg-container rounded-md">Postbox list</h1>
      <h1 className="p-12 bg-container rounded-md">Postbox list</h1>
      <h1 className="p-12 bg-container rounded-md">Postbox list</h1> */}
    </div>
  );
};
