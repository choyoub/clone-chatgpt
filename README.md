# clone-chatgpt

## Neon PostgreSQL (Database)

1. [neon](https://console.neon.tech/app/projects) 웹사이트에 접속하여 계정을 생성합니다.
2. 로그인 후, 새로운 프로젝트를 생성합니다.
3. 프로젝트 생성 후, 데이터베이스 인스턴스를 생성합니다.
4. `.env` 파일에 다음과 같이 데이터베이스 연결 정보를 추가합니다:
   ```
   DATABASE_URL=your_database_url
   ```

## Drizzle-ORM (ORM)

1. [drizzle-orm](https://orm.drizzle.team/docs/get-started/postgresql-new) 웹사이트에서 세팅가이드를 따라 작성해준다.
2. db 폴더에 스키마에 index.ts 데이타베이스 컨넥트, schema.ts에 스키마
3. actions 폴더에 실행쿼리
4. data 폴더에 조회쿼리

## Drizzle ORM PostgreSQL 설정 메뉴얼

1. Drizzle ORM 패키지를 설치합니다:
   ```bash
   npm install drizzle-orm pg
   ```
2. `db/index.ts` 파일을 생성하고 데이터베이스 연결을 설정합니다:

   ```typescript
   import { drizzle } from "drizzle-orm";
   import { Pool } from "pg";

   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });

   export const db = drizzle(pool);
   ```

3. `db/schema.ts` 파일을 생성하고 스키마를 정의합니다:

   ```typescript
   import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

   export const users = pgTable("users", {
     id: serial("id").primaryKey(),
     name: varchar("name", { length: 255 }),
     email: varchar("email", { length: 255 }).unique(),
     password: varchar("password", { length: 255 }),
   });
   ```

4. `actions` 폴더에 실행 쿼리를 작성합니다. 예를 들어, 새로운 사용자를 생성하는 쿼리를 작성합니다:

   ```typescript
   import { db } from "../db";
   import { users } from "../db/schema";

   export async function createUser(
     name: string,
     email: string,
     password: string
   ) {
     await db.insert(users).values({ name, email, password });
   }
   ```

5. `data` 폴더에 조회 쿼리를 작성합니다. 예를 들어, 사용자를 조회하는 쿼리를 작성합니다:

   ```typescript
   import { db } from "../db";
   import { users } from "../db/schema";

   export async function getUserByEmail(email: string) {
     return await db.select().from(users).where(users.email.eq(email)).single();
   }
   ```

이제 프로젝트에서 Drizzle ORM을 사용하여 PostgreSQL 데이터베이스와 상호작용할 준비가 완료되었습니다.

## Vercel 에 배포 (CI/CD)

1. [vercel](https://vercel.com/netices-projects) 웹사이트에 접속하여 import project로 git을 연결하고 빌드 배포한다.
