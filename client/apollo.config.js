const endpoint = process.env.GRAPHQL_ENDPOINT;

module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "near-celeb-backend",
      url:
        process.env.NODE_ENV === "production"
          ? `https://nearceleb.com/graphql`
          : `http://localhost:4444/graphql`,
    },
  },
};
