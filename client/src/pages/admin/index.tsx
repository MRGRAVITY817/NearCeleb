import Head from "next/head";
import { AdminMenu } from "../../components/specific/Admin/Common/organisms/AdminMenu/AdminMenu";

const AdminPage = () => {
  return (
    <div>
      <Head>
        <title>Admin | Near Celeb</title>
      </Head>
      <div className="laptop:my-0 my-14 p-4 laptop:px-24 laptop:py-20 min-h-screen">
        <AdminMenu direction="row" />
      </div>
    </div>
  );
};

export default AdminPage;
