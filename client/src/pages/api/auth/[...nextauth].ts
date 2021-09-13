import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { signOut } from "next-auth/client";
import Providers from "next-auth/providers";

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
};

const OauthAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const getAuthorization = await NextAuth(req, res, options);
  return getAuthorization;
};

export default OauthAPI;
