"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useModelStore from "@/store/model";

const MODELS = ["gpt-3.5-turbo", "gpt-4", "gpt-4o"];

export default function ModelSelect() {
  const { model: currentModel, updateModel } = useModelStore();

  const handleChange = (selectModel: string) => {
    updateModel(selectModel);
  };

  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] border-none focus:ring-transparent">
        <SelectValue placeholder="모델 선택" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((item) => {
          return (
            <SelectItem
              key={item}
              value={item}
              disabled={currentModel === item}
            >
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
