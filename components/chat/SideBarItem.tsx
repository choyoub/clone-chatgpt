"use client";

import Link from "next/link";
import {
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useSheetStore from "@/store/sheet";
import { deleteConveration, updateConveration } from "@/actions/conversation";
import toast from "react-hot-toast";
import useModalStore from "@/store/modal";
import ModalFooter from "../modal/ModalFooter";
import { BASE_URL } from "@/constants/routes";

type Props = {
  item: {
    id: string;
    label: string;
    icon: ReactNode;
    href: string;
  };
};
export default function SideBarItem({ item }: Props) {
  const { id, href, icon, label } = item;
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(item.label);
  const { openModal, closeModal } = useModalStore();
  const { setOpen } = useSheetStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const clickEdit = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      hadleBlur();
    }
  };

  const hadleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      try {
        await updateConveration(id, value);
      } catch (error) {
        console.error(error);
        toast.error("이름 수정에 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  const handleDelete = async () => {
    try {
      await deleteConveration(id);

      toast.success("삭제되었습니다.");

      if (params.conversationId === id) {
        router.push(BASE_URL);
      }

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("삭제에 실패하였습니다.");
    }
  };

  const clickDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    openModal({
      title: "정말 삭제하겠습니까?",
      description: "삭제 후 데이터는 복구하기 어려울 수 있습니다.",
      footer: <ModalFooter onCancel={closeModal} onConfirm={handleDelete} />,
    });

    setIsMenuOpen(false);
  };

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",
        isMenuOpen || pathname === href
          ? "text-white bg-white/10"
          : "text-zinc-400"
      )}
    >
      {/* label 영역 */}
      <div className="flex items-center gap-2">
        {icon}
        {isEditMode ? (
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onClick={(event) => event.preventDefault()}
            onBlur={hadleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1"
          />
        ) : (
          <div className="w-[180px] truncate">{label}</div>
        )}
      </div>
      {/* 드롭다운 메뉴 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis
                className={cn(
                  "group-hover:block text-gray-400 hover:text-white",
                  isMenuOpen ? "block text-white" : "md:hidden text-gray-400"
                )}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex gap-2" onClick={clickEdit}>
              <Pencil size={18} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2" onClick={clickDelete}>
              <Trash size={18} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
