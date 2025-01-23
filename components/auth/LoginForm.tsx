"use client";

import React, { ChangeEvent, useActionState, useEffect } from "react";
import FormCard from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { LoginSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import toast from "react-hot-toast";
import { login } from "@/actions/login";

export default function LoginForm() {
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const [error, action] = useActionState(login, undefined);

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form className="space-y-6" action={action}>
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
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
