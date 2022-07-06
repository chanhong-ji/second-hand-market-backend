# Second hand market project - Backend

## 1. Description

- second hand market project 프론트엔드 프로젝트의 서버 구현

- graphql 형식의 prisma data model 정의

- PostgreSQL 에 쿼리를 생성하여 전달하기 위한 graphQL schema 생성

---

## 2. Tools

- nodeJS
- typeScipt
- graphQL

- Apollo server

---

## 3. Frame of Prisma model

- User
- Post
- Zone
- Interest
- Category
- Room
- Message

---

## 4. Details of graphQL schema

### 1. User

- createAccount
- login
- editProfile
- seeProfile
- seeFollowing
- toggleFollow
- me

### 2. Post

- createPost
- editPost
- getDealtPost
- deletePost
- seePosts
- seePost
- searchPost
- seeInterests
- toggleInterest
- createZone (for admin)
- createCategory (for admin)

### 3. Message & Room

- seeRooms
- seeRoom
- sendMessage
- readMessage
- updateRoom (subscription)
