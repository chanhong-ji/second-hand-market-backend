import AWS from 'aws-sdk';
import { zoneFirst, zoneSecond } from './zones';
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

export const zoneProcess = (zoneId: number) => {
  const zoneN = String(zoneId);
  const second = zoneN.slice(-2);
  const first = zoneN.slice(0, -2);
  const zoneName = zoneFirst[+first] + ' ' + zoneSecond[+first][+second];
  return zoneName;
};
