import AWS from 'aws-sdk';
import { zoneFirst, zoneSecond } from './dataList';
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: 'ap-northeast-2',
});

export const uploadToS3 = async (file: any, userId: number, path: string) => {
  const { filename, createReadStream } = await file;
  const stream = createReadStream();
  const objectName = `${path}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'carrotee',
      Key: objectName,
      ACL: 'public-read',
      Body: stream,
    })
    .promise();
  return Location;
};

export const deleteFromS3 = async (fileUrl: string) => {
  const decodedUrl = decodeURI(fileUrl);
  const objectName = decodedUrl.split('/').slice(-2).join('/');
  await new AWS.S3()
    .deleteObject({
      Bucket: 'carrotee',
      Key: objectName,
    })
    .promise();
};

export const zoneNameProcess = (zoneId: string) => {
  const first = zoneId.slice(0, -2);
  const second = zoneId.slice(-2);
  const a = zoneFirst[+first];
  const b = zoneSecond[+first][+second];
  if (a && b) {
    return a + ' ' + b;
  } else {
    return false;
  }
};

export const zoneIdProcess = (first: number, second: number): string => {
  return String(first) + String(second).padStart(2, '0');
};

export const createErrorMessage = (resolver: string, error: any): string => {
  return `DB error from ${resolver} resolver:${error}`;
};
