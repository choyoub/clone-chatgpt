"use client";

import React, { ChangeEvent, useActionState, useEffect } from "react";
import FormCard from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { TSingUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { signup } from "@/actions/signup";
import toast from "react-hot-toast";

export default function SingUpForm() {
  const { errors, validateField } =
    useFormValidate<TSingUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const [error, action] = useActionState(signup, undefined);

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form className="space-y-6" action={action}>
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
