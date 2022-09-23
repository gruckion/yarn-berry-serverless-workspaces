import { S3 } from "aws-sdk";
import { CopyObjectRequest, HeadObjectRequest } from "aws-sdk/clients/s3";

type PutObjectRequest = S3.Types.PutObjectRequest;
type PutObjectOutput = S3.Types.PutObjectOutput;
type Body = S3.Body;

type CopyInputParams = {
  fileName: string;
  destinationBucket: string;
  sourceBucket: string;
  sourcePath: string;
  destinationPath: string;
};

class S3Client {
  protected client: S3;

  public constructor() {
    this.client = new S3();
  }

  public async put(
    fileName: string,
    contents: Body,
    bucketName: string,
    putObjectRequest: Partial<PutObjectRequest>
  ): Promise<PutObjectOutput | null> {
    const request: PutObjectRequest = {
      Key: fileName,
      Body: contents,
      ContentType: "application/json; charset=utf-8",
      CacheControl: "max-age=60",
      Bucket: bucketName,
      ...putObjectRequest,
      ACL: "private",
    };

    try {
      const data = await this.client.putObject(request).promise();

      if (!data) {
        throw new Error(
          `Writing file ${fileName} to bucket ${bucketName} failed.`
        );
      }

      return data;
    } catch (error) {
      console.error(
        `Error when writing ${fileName} to bucket ${bucketName}`,
        error
      );
      throw error;
    }
  }

  public async get(
    fileName: string,
    bucketName: string
  ): Promise<string | null> {
    const request = {
      Bucket: bucketName,
      Key: fileName,
    };

    try {
      const data = await this.client.getObject(request).promise();

      if (!data || !data.Body) {
        throw Error(
          `Reading file ${fileName} from bucket ${bucketName} failed.`
        );
      }

      const body = data.Body as string;

      return body;
    } catch (error) {
      console.error(
        `Error when reading ${fileName} from bucket ${bucketName}`,
        error
      );
      throw error;
    }
  }

  public async head(fileName: string, bucketName: string) {
    const request: HeadObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
    };
    try {
      const metadata = await this.client.headObject(request).promise();
      return metadata;
    } catch (error) {
      console.error(
        `Error when reading metadata for ${fileName} from bucket ${bucketName}`,
        error
      );
      throw error;
    }
  }

  public async copy({
    fileName,
    destinationBucket,
    sourceBucket,
    sourcePath,
    destinationPath,
  }: CopyInputParams): Promise<string | null> {
    const key = `${destinationPath}/${fileName}`;
    const copySource = encodeURI(`${sourceBucket}/${sourcePath}/${fileName}`);
    const request: CopyObjectRequest = {
      Bucket: destinationBucket,
      CopySource: copySource,
      Key: key,
    };

    try {
      const data = await this.client.copyObject(request).promise();

      if (!data || !data.CopyObjectResult) {
        throw new Error(
          `Copying to key ${key} from source ${copySource} failed.`
        );
      }

      return key;
    } catch (error) {
      console.error(
        `Error when copying to key ${key} from source ${copySource}`,
        error
      );
      throw error;
    }
  }
}

export const s3Client = new S3Client();
