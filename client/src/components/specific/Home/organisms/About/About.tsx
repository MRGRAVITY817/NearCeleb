import { Container } from "../../../../common/atoms";
import { Service } from "../../molecules";

const bgCover =
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

export const About = () => {
  return (
    <div>
      <Container bgCover={bgCover} bgDirection="center" gradient>
        <h1 className="my-12 laptop:my-20 text-center laptop:text-3xl text-xl">
          NearCeleb's digital letter won't lose your analogous sentiments.
        </h1>
      </Container>
      <div className="grid gap-4 grid-cols-1 laptop:grid-cols-2 mt-4">
        <Service
          title="AI Service"
          first="Recommends letter sentences"
          second="Analyze celeb's info, news and etc"
        />
        <Service
          title="Contents News"
          first="Celebs from media contents"
          second="New contents about favorite celeb"
        />
        <Service
          title="Celeb Info"
          first="Daily events of your favorite celeb"
          second="Celeb's Korean address"
        />
        <Service
          title="Cloud Postbox"
          first="Access when/wherever the celeb is"
          second="Personalized solution for celeb's own postbox"
        />
      </div>
    </div>
  );
};
