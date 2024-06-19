<div align="center">
<h1>BE - 메르헨 코더</h1>
<h3>메르헨 코더 프로젝트의 backend 레포지토리</h3>
<p>이화여자대학교 엘택공과대학 컴퓨터공학과 캡스톤디자인과창업프로젝트(23.09~24.06)<br>12팀 팀팀탱탱후라이팬 : 김미진(팀장), 김지우, 이도현</p>
<img src="https://github.com/MerchenCoder/BackendServer/assets/105702023/f890c3bc-b258-4897-9736-83633287b3f7" width="500" height="auto">
</div>


## 팀원
|이름|역할|개인 깃허브|
|------|---|---|
|김미진(팀장)|기획, 그래픽, 프론트엔드(게임 시스템)|[@Mijin-Ewha](https://github.com/Mijin-Ewha)|
|김지우|기획, 프론트엔드(게임 시스템, 데이터 관리 시스템)|[@ZoroZuro1](https://github.com/ZoroZuro1)|
|이도현|기획, 프론트엔드(게임 시스템, 데이터 관리 시스템), 백엔드|[@rnrgll](https://github.com/rnrgll)|

## 프로젝트 소개
<메르헨 코더 : 코딩으로 동화 세계를 구하라!>는 코딩 학습에 흥미가 있는 초등학생을 대상으로 한 코딩 학습 모바일 게임입니다. 유니티와 C# 스크립트를 활용하여 직접 개발한 비주얼 프로그래밍 도구로 프로그래밍 학습을 진행합니다. 게임의 서버는 Node.js로 구현되었으며 현재 레포지토리는 <b>배포가 아닌 개발 및 테스트 환경에서 사용</b>되어야 합니다.

### 주요 기능
- 회원가입
- 로그인
- 계정 삭제
- 게임 데이터 저장
- 게임 데이터 불러오기(로드)
- S3에 저장된 정적 파일을 다운로드

<br>

## 시작 가이드
### Requirements
- Node.js v16.14.0
- npm 8.3.1
- psql 14.12
- Ubuntu 14.12-0ubuntu0.22.04.1(AWS EC2)
### Installiation
<b>로컬에서 게임 서버를 설치하고 실행하는 방법</b>은 다음과 같습니다.(개발 및 테스트 용입니다. 배포용이 아닙니다.)
1. 저장소를 클론합니다.
   ```sh
   git clone https://github.com/MerchenCoder/BackendServer.git
   cd BackendServer
   ```
2. 필요한 의존성을 설치합니다.
   ```
   npm install
   ```
3. PostgreSQL을 설치하고 아래를 따라 user와 데이터베이스를 생성합니다.
   1) PostgreSQL를 설치합니다.
      
      [PostgreSQL 설치](https://www.postgresql.org/download/)

      이미 설치되어 있다면 3번부터 진행합니다.
      macOS는 homebrew로 설치할 수 있습니다.
   3) PostgreSQL 서비스를 시작합니다.
      ```
      brew services start postgresql
      ```
   4) PostgreSQL 콘솔에 접속합니다.
      ```
      psql postgres
      ```
   5) 사용자를 생성합니다. 예) 유저명 : devuser, password : dev1234
      ```
      postgres=# CREATE ROLE devuser WITH LOGIN PASSWORD 'dev1234';
      ```
      * 사용자 확인 방법 : `postgres=# \du`
   6) 사용자에게 권한을 부여합니다.
      ```
      postgres=# ALTER ROLE devuser CREATEDB;
      postgres=# ALTER ROLE devuser CREATEROLE;
      ```
   7) 새로 만든 유저로 접속합니다. (devuser로 접속)
  
      이제 terminal 창에서 새로 만든 유저로 다시 접속합니다. (postgresql 접속 종료를 하려면 `\q`를 사용하면 됩니다.)
      ```
      $ psql postgres -U devuser;
      ```
   9) 데이터베이스 생성합니다. 예)merchencoderdb
      ```
      CREATE DATABASE merchencoderdb;
      ```
4. 환경 변수를 설정합니다.
   1) 루트 디렉토리에 `.env` 파일을 생성하고 환경 변수를 추가합니다. (`.env` 파일은 `.gitignore` 파일에 추가하여 저장소에 올라가지 않도록 해야합니다.)
      
       - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY 에는 AWS IAM에서 생성한 사용자의 액세스 키를 넣어줍니다.
       - POSTGRE_SQL_USER에는 생성한 유저 이름을 넣어줍니다.
       - POSTGRE_SQL_PASSWORD에는 비밀번호을 넣어줍니다.
       - POSTGRE_SQL_DATABASE에는 생성한 데이터베이스 이름을 넣어줍니다.

      <br>
      
       ```
       AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
       AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
       POSTGRE_SQL_HOST = 127.0.0.1
       POSTGRE_SQL_DATABASE = testdb
       POSTGRE_SQL_USER=devuser
       POSTGRE_SQL_PASSWORD=dev1234
       POSTGRE_SQL_PORT = 5432
       ```
   1) config.json 파일 내용을 변경합니다.
      
      config 폴더 안에 있는 <b>config.json 파일</b>을 열어 username(데이터베이스 유저 이름), password(데이터베이스 유저 비밀번호), database(데이터베이스 이름)을 앞 단계에서 설정한대로 변경해줍니다.

5. 데이터 마이그레이션 실행합니다.
   1) Sequelize CLI 설치합니다.
      ```
      npm install sequelize-cli --save-dev
      ```
   2) 마이그레이션 실행합니다.
      ```
      npx sequelize-cli db:migrate
      ```

   
6. 서버를 시작합니다.
   ```
   node server.js
   ```
   서버가 실행되면 'http://localhost:3000'에서 API에 접근할 수 있습니다.


<br>

## Stacks
### Development
<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
</div>

### Deploy
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 


<br>

## 아키텍쳐
### 시스템 구조도
![poster_sw_architec_final](https://github.com/MerchenCoder/BackendServer/assets/105702023/53b44cfc-e391-4384-832b-547647cd0f57)

### 디렉토리 구조
```
├── README.md
├── .gitignore
├── package-lock.json
├── package.json
├── config
│   ├── config.json #데이터베이스 설정 정보
├── migrations
│   └──             # 데이터베이스 마이그레이션 파일(데이터 마이그레이션 용도)
├── models
│   └──             # 데이터베이스 테이블의 모델 정의(데이터 마이그레이션 용도)
├── seeders         # 데이터베이스 초기 데이터 삽입 시딩 파일(데이터 마이그레이션 용도)
├── routes
│   ├── downloadFile.js # 파일 다운로드 기능
│   ├── load.js # 데이터 로드 기능
│   ├── save.js # 데이터 저장 기능
│   ├── signin.js # 로그인 기능
│   ├── signup.js # 회원가입, 계정 삭제 기능
└── sever.js # 메인 서버 애플리케이션 엔트리 포인트
```

## License
Distributed under the MIT License. See LICENSE for more information.
