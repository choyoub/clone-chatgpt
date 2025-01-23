import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  name?: string;
  content?: string;
  role: string;
};
export default function Message({ name = "User", content = "", role }: Props) {
  const isAssistant = role === "assistant";
  const avatarName = isAssistant ? "Chat GPT" : name;
  return (
    <div className="flex items-center gap-2 mb-5">
      {/* 아바타 */}
      <Avatar>
        <AvatarImage src={isAssistant ? "/logo.png" : ""} alt="avatar" />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>

      {/* 이름 + 내용 */}
      <div className="mt-2">
        <div className="font-bold">{avatarName}</div>
        <div className="mt-2 whitespace-break-spaces">{content}</div>
      </div>
    </div>
  );
}
