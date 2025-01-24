import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// 사용자 테이블 정의
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(), // 고유 식별자
  name: text("name").notNull(), // 사용자 이름
  email: text("email").notNull().unique(), // 이메일 (고유값)
  password: text("password").notNull(), // 비밀번호

  createdAt: timestamp("created_at").defaultNow().notNull(), // 생성 시간
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // 수정 시간
});

// 사용자 관계 정의 - 대화 내역과의 1:N 관계
export const userRelations = relations(user, ({ many }) => ({
  conversations: many(conversation),
}));

// 대화 테이블 정의
export const conversation = pgTable("conversation", {
  id: uuid("id").defaultRandom().notNull().primaryKey(), // 고유 식별자
  name: text("name"), // 대화 이름
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" }) // 사용자 외래키 (사용자 삭제시 대화도 삭제)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), // 생성 시간
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // 수정 시간
});

// 대화 관계 정의
export const conversationRelations = relations(
  conversation,
  ({ one, many }) => ({
    user: one(user, {
      fields: [conversation.userId], // 사용자와의 N:1 관계
      references: [user.id],
    }),
    messages: many(message), // 메시지와의 1:N 관계
  })
);

// 메시지 테이블 정의
export const message = pgTable("message", {
  id: uuid("id").defaultRandom().notNull().primaryKey(), // 고유 식별자
  content: text("content"), // 메시지 내용
  role: text("role").$type<"user" | "assistant">(), // 메시지 작성자 역할 (사용자 또는 AI)
  conversationId: uuid("conversationId")
    .references(() => conversation.id, { onDelete: "cascade" }) // 대화 외래키 (대화 삭제시 메시지도 삭제)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), // 생성 시간
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // 수정 시간
});

// 메시지 관계 정의 - 대화와의 N:1 관계
export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));
