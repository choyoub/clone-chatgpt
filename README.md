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

## 프로젝트 구조

```
📦 프로젝트 루트
├── 📄 .env
├── 📄 .gitignore
├── 📂 actions
│   ├── 📄 conversation.ts
│   ├── 📄 login.ts
│   ├── 📄 sessions.ts
│   └── 📄 signup.ts
├── 📂 app
│   ├── 📂 (auth)
│   │   ├── 📄 layout.tsx
│   │   ├── 📂 login
│   │   │   └── 📄 page.tsx
│   │   └── 📂 signup
│   │       └── 📄 page.tsx
│   └── 📂 (chat)
│       ├── 📂 c
│       │   └── 📂 [conversationId]
│       │       └── 📄 page.tsx
│       ├── 📄 layout.tsx
│       └── 📄 page.tsx
├── 📂 components
│   ├── 📂 auth
│   │   ├── 📄 FormCard.tsx
│   │   ├── 📄 FormMessage.tsx
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 SingUpForm.tsx
│   │   └── 📄 Submit.tsx
│   ├── 📂 chat
│   │   ├── 📄 AutoResizingTextarea.tsx
│   │   ├── 📄 Chat.tsx
│   │   ├── 📄 Empty.tsx
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 Logo.tsx
│   │   ├── 📄 LogoutButton.tsx
│   │   ├── 📄 Message.tsx
│   │   ├── 📄 MobileMenu.tsx
│   │   ├── 📄 ModelSelect.tsx
│   │   ├── 📄 SideBar.tsx
│   │   ├── 📄 SideBarItem.tsx
│   │   └── 📄 UserProvider.tsx
│   ├── 📂 modal
│   │   ├── 📄 Modal.tsx
│   │   └── 📄 ModalFooter.tsx
│   └── 📂 ui
│       ├── 📄 avatar.tsx
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 dialog.tsx
│       ├── 📄 dropdown-menu.tsx
│       ├── 📄 input.tsx
│       ├── 📄 label.tsx
│       ├── 📄 select.tsx
│       ├── 📄 sheet.tsx
│       └── 📄 textarea.tsx
├── 📄 components.json
├── 📂 constants
│   ├── 📄 dummy.ts
│   └── 📄 routes.ts
├── 📂 data
│   ├── 📄 conversation.ts
│   └── 📄 user.ts
├── 📂 db
│   ├── 📄 index.ts
│   └── 📄 schema.ts
├── 📄 drizzle.config.ts
├── 📄 eslint.config.mjs
├── 📂 hooks
│   └── 📄 useFormValidate.ts
├── 📂 lib
│   └── 📄 utils.ts
├── 📄 middleware.ts
├── 📂 migrations
│   ├── 📄 0000_nervous_ben_urich.sql
│   ├── 📄 0001_slimy_korg.sql
│   └── 📂 meta
│       ├── 📄 0000_snapshot.json
│       ├── 📄 0001_snapshot.json
│       └── 📄 _journal.json
├── 📄 next-env.d.ts
├── 📄 next.config.ts
├── 📄 package.json
├── 📄 postcss.config.mjs
├── 📂 public
├── 📄 README.md
├── 📂 schemas
│   └── 📄 auth.ts
├── 📂 store
│   ├── 📄 modal.ts
│   ├── 📄 model.ts
│   ├── 📄 sheet.ts
│   └── 📄 user.ts
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
└── 📂 types
    ├── 📄 db.ts
    └── 📄 form.ts
```

## 프로젝트 아키텍처

이 프로젝트는 다음과 같은 주요 폴더와 파일로 구성되어 있습니다:

### 루트 디렉토리

- `.env`: 환경 변수 파일로, 데이터베이스 URL과 같은 민감한 정보를 저장합니다.
- `.gitignore`: Git이 추적하지 않을 파일 및 디렉토리를 지정합니다.
- `README.md`: 프로젝트에 대한 설명과 설정 방법을 포함합니다.
- `next-env.d.ts`: Next.js 프로젝트의 타입 정의 파일입니다.
- `next.config.ts`: Next.js 설정 파일입니다.
- `package.json`: 프로젝트의 종속성 및 스크립트를 정의합니다.
- `tsconfig.json`: TypeScript 설정 파일입니다.
- `tailwind.config.ts`: Tailwind CSS 설정 파일입니다.
- `postcss.config.mjs`: PostCSS 설정 파일입니다.
- `eslint.config.mjs`: ESLint 설정 파일입니다.

### `actions`

- 서버에서 실행되는 함수들을 포함합니다. 예를 들어, 로그인, 회원가입, 세션 관리 등의 기능을 구현합니다.
  - `actions/conversation.ts`: 대화 관련 서버 액션을 정의합니다.
  - `actions/login.ts`: 로그인 관련 서버 액션을 정의합니다.
  - `actions/sessions.ts`: 세션 관리 관련 서버 액션을 정의합니다.
  - `actions/signup.ts`: 회원가입 관련 서버 액션을 정의합니다.

### `app`

- Next.js의 새로운 App Router를 사용하여 페이지와 레이아웃을 정의합니다.

  - `(auth)/`: 인증 관련 페이지와 레이아웃을 포함합니다.
    - `app/(auth)/layout.tsx`: 인증 관련 페이지의 레이아웃을 정의합니다.
    - `app/(auth)/login/page.tsx`: 로그인 페이지를 정의합니다.
    - `app/(auth)/signup/page.tsx`: 회원가입 페이지를 정의합니다.
  - `(chat)/`: 채팅 관련 페이지와 레이아웃을 포함합니다.
    - `app/(chat)/c/[conversationId]/page.tsx`: 특정 대화 페이지를 정의합니다.
    - `app/(chat)/layout.tsx`: 채팅 관련 페이지의 레이아웃을 정의합니다.
    - `app/(chat)/page.tsx`: 기본 채팅 페이지를 정의합니다.

  ### 그룹 라우트와 다이나믹 라우트

  #### auth 그룹 라우트

  - **그룹 라우트**: `(auth)` 폴더는 인증 관련 페이지들을 그룹화하여 라우팅을 관리합니다. 이는 URL 구조를 깔끔하게 유지하고 관련 페이지들을 논리적으로 그룹화하는 데 유용합니다.
    - **layout.tsx**: 인증 관련 페이지의 레이아웃을 정의합니다. 모든 인증 관련 페이지는 이 레이아웃을 공유합니다.
    - **page.tsx**: 로그인 페이지를 정의합니다. 사용자가 로그인할 수 있는 페이지입니다.
    - **page.tsx**: 회원가입 페이지를 정의합니다. 사용자가 회원가입할 수 있는 페이지입니다.

  #### chat 그룹 라우트

  - **그룹 라우트**: `(chat)` 폴더는 채팅 관련 페이지들을 그룹화하여 라우팅을 관리합니다. 이는 URL 구조를 깔끔하게 유지하고 관련 페이지들을 논리적으로 그룹화하는 데 유용합니다.
    - **layout.tsx**: 채팅 관련 페이지의 레이아웃을 정의합니다. 모든 채팅 관련 페이지는 이 레이아웃을 공유합니다.
    - **page.tsx**: 기본 채팅 페이지를 정의합니다. 사용자가 채팅 목록을 볼 수 있는 페이지입니다.
    - **page.tsx**: 특정 대화 페이지를 정의합니다. 여기서 `[conversationId]`는 다이나믹 라우트로, URL의 해당 부분이 동적임을 나타내며, 실제 대화 ID에 따라 다른 페이지를 렌더링합니다. 이는 다양한 대화 ID에 따라 다른 콘텐츠를 제공하는 데 유용합니다.

  이와 같이 `auth`와 `chat` 그룹 라우트는 각각 인증과 채팅 관련 페이지들을 논리적으로 그룹화하여 관리하며, 다이나믹 라우트를 통해 동적인 URL 구조를 지원합니다.

### `components`

- 재사용 가능한 UI 컴포넌트들을 포함합니다.
  - `auth/`: 인증 관련 컴포넌트를 포함합니다.
    - `components/auth/FormCard.tsx`: 폼 카드 컴포넌트입니다.
    - `components/auth/FormMessage.tsx`: 폼 메시지 컴포넌트입니다.
    - `components/auth/LoginForm.tsx`: 로그인 폼 컴포넌트입니다.
    - `components/auth/SingUpForm.tsx`: 회원가입 폼 컴포넌트입니다.
    - `components/auth/Submit.tsx`: 제출 버튼 컴포넌트입니다.
  - `chat/`: 채팅 관련 컴포넌트를 포함합니다.
    - `components/chat/AutoResizingTextarea.tsx`: 자동 크기 조정 텍스트 영역 컴포넌트입니다.
    - `components/chat/Chat.tsx`: 채팅 컴포넌트입니다.
    - `components/chat/Empty.tsx`: 빈 상태 컴포넌트입니다.
    - `components/chat/Header.tsx`: 헤더 컴포넌트입니다.
    - `components/chat/Logo.tsx`: 로고 컴포넌트입니다.
    - `components/chat/LogoutButton.tsx`: 로그아웃 버튼 컴포넌트입니다.
    - `components/chat/Message.tsx`: 메시지 컴포넌트입니다.
    - `components/chat/MobileMenu.tsx`: 모바일 메뉴 컴포넌트입니다.
    - `components/chat/ModelSelect.tsx`: 모델 선택 컴포넌트입니다.
    - `components/chat/SideBar.tsx`: 사이드바 컴포넌트입니다.
    - `components/chat/SideBarItem.tsx`: 사이드바 아이템 컴포넌트입니다.
    - `components/chat/UserProvider.tsx`: 사용자 제공자 컴포넌트입니다.
  - `modal/`: 모달 관련 컴포넌트를 포함합니다.
    - `components/modal/Modal.tsx`: 모달 컴포넌트입니다.
    - `components/modal/ModalFooter.tsx`: 모달 푸터 컴포넌트입니다.
  - `ui/`: 기본 UI 컴포넌트를 포함합니다.
    - `components/ui/avatar.tsx`: 아바타 컴포넌트입니다.
    - `components/ui/button.tsx`: 버튼 컴포넌트입니다.
    - `components/ui/card.tsx`: 카드 컴포넌트입니다.
    - `components/ui/dialog.tsx`: 다이얼로그 컴포넌트입니다.
    - `components/ui/dropdown-menu.tsx`: 드롭다운 메뉴 컴포넌트입니다.
    - `components/ui/input.tsx`: 입력 필드 컴포넌트입니다.
    - `components/ui/label.tsx`: 라벨 컴포넌트입니다.
    - `components/ui/select.tsx`: 선택 컴포넌트입니다.
    - `components/ui/sheet.tsx`: 시트 컴포넌트입니다.
    - `components/ui/textarea.tsx`: 텍스트 영역 컴포넌트입니다.

### `constants`

- 상수 값을 정의합니다.
  - `constants/dummy.ts`: 더미 데이터를 포함합니다.
  - `constants/routes.ts`: 라우트 상수를 포함합니다.

### `data`

- 데이터베이스 조회 쿼리를 포함합니다.
  - `data/conversation.ts`: 대화 관련 조회 쿼리를 정의합니다.
  - `data/user.ts`: 사용자 관련 조회 쿼리를 정의합니다.

### `db`

- 데이터베이스 설정 및 스키마를 정의합니다.
  - `db/index.ts`: 데이터베이스 연결을 설정합니다.
  - `db/schema.ts`: 데이터베이스 스키마를 정의합니다.

### `drizzle.config.ts`

- Drizzle ORM 설정 파일입니다.

### `hooks`

- 커스텀 훅을 포함합니다.
  - `hooks/useFormValidate.ts`: 폼 유효성 검사를 위한 커스텀 훅입니다.

### `lib`

- 유틸리티 함수를 포함합니다.
  - `lib/utils.ts`: 유틸리티 함수들을 정의합니다.

### `middleware.ts`

- Next.js 미들웨어 파일입니다.

### `migrations`

- 데이터베이스 마이그레이션 파일을 포함합니다.
  - `migrations/0000_nervous_ben_urich.sql`: 초기 마이그레이션 파일입니다.
  - `migrations/0001_slimy_korg.sql`: 두 번째 마이그레이션 파일입니다.
  - `meta/`: 메타 데이터를 포함합니다.
    - `migrations/meta/0000_snapshot.json`: 초기 스냅샷 파일입니다.
    - `migrations/meta/0001_snapshot.json`: 두 번째 스냅샷 파일입니다.
    - `migrations/meta/_journal.json`: 마이그레이션 저널 파일입니다.

### `schemas`

- Zod 스키마를 포함합니다.
  - `schemas/auth.ts`: 인증 관련 스키마를 정의합니다.

### `store`

- Zustand 상태 관리를 포함합니다.
  - `store/modal.ts`: 모달 상태 관리를 정의합니다.
  - `store/model.ts`: 모델 상태 관리를 정의합니다.
  - `store/sheet.ts`: 시트 상태 관리를 정의합니다.
  - `store/user.ts`: 사용자 상태 관리를 정의합니다.

### `types`

- 타입 정의 파일을 포함합니다.
  - `types/db.ts`: 데이터베이스 관련 타입을 정의합니다.
  - `types/form.ts`: 폼 관련 타입을 정의합니다.

### `public`

- 정적 파일을 포함합니다.

## Next.js에서 Drizzle ORM 설정 및 실행 방법

### 1. 필요한 패키지 설치

```bash
npm install drizzle-orm @vercel/postgres pg
npm install -D drizzle-kit
```

### 2. drizzle.config.ts 설정

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### 3. package.json에 스크립트 추가

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 4. 마이그레이션 실행

```bash
# 스키마 변경사항을 감지하여 마이그레이션 파일 생성
npm run db:generate

# 데이터베이스에 마이그레이션 적용
npm run db:push

# (선택사항) Drizzle Studio 실행하여 데이터베이스 관리
npm run db:studio
```

### 5. Next.js 서버 컴포넌트에서 사용 예시

```typescript
// app/users/page.tsx
import { db } from "@/db";
import { users } from "@/db/schema";

export default async function UsersPage() {
  const allUsers = await db.select().from(users);

  return (
    <div>
      {allUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 6. API 라우트에서 사용 예시

```typescript
// app/api/users/route.ts
import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await db.insert(users).values(body).returning();
  return NextResponse.json(newUser[0]);
}
```

### 주의사항

1. 환경 변수 설정이 필요합니다:

   ```env
   DATABASE_URL="postgresql://..."
   ```

2. 프로덕션 환경에서는 마이그레이션을 신중하게 관리해야 합니다.

3. Vercel에 배포할 경우 Storage API를 사용하는 것이 권장됩니다:

   ```typescript
   import { sql } from "@vercel/postgres";
   import { drizzle } from "drizzle-orm/vercel-postgres";

   export const db = drizzle(sql);
   ```

4. 개발 환경과 프로덕션 환경의 데이터베이스 설정을 분리하는 것이 좋습니다.
