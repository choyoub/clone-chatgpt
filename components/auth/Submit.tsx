import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function Submit({ children, ...others }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...others}>
      {children}
    </Button>
  );
}
