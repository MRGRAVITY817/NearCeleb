import * as AWS from 'aws-sdk';

export const AwsVerifiedStorage = () => {
  const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
  const region = 'kr-standard';
  const accessKeyId = process.env.NAVER_ACCESS_KEY;
  const secretAccessKey = process.env.NAVER_SECRET_KEY;
  const S3 = new AWS.S3({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  return S3;
};
