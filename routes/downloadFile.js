require("dotenv").config(); // dotenv 라이브러리를 사용하여 .env 파일을 읽어 환경 변수로 설정합니다.

const express = require("express");
const router = express.Router(); // express 라우터 생성

const AWS = require("aws-sdk");
const BUCKET_NAME = "merhencoderbucket";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 환경 변수에서 Access key를 가져옵니다.
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 환경 변수에서 Secret key를 가져옵니다.
});

router.get("/", (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
  };

  // 가져온 파일 리스트를 담을 배열
  const fileDataList = [];

  // 파일 리스트 가져오기
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ cmd: 500, errorno: 500 });
      return;
    }

    const fileCount = data.Contents.length;
    let filesProcessed = 0;

    // 버킷 내의 모든 파일에 대해 각 파일에 대한 응답을 클라이언트에게 전송
    data.Contents.forEach((file) => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: file.Key,
      };
      s3.getObject(params, (err, fileData) => {
        if (err) {
          console.log(err);
          res.status(500).json({ cmd: 500, errorno: 500 });
          return;
        }
        // 파일 경로와 데이터를 객체로 묶어 리스트에 추가
        const fileObject = {
          path: file.Key,
          data: fileData.Body.toString(),
        };
        fileDataList.push(fileObject);
        // 파일 처리 완료 시 응답 보내기
        filesProcessed++;
        if (filesProcessed === fileCount) {
          res
            .status(200)
            .json({ cmd: 200, errorno: 0, fileData: fileDataList });
        }
      });
    });
  });
});

module.exports = router;
