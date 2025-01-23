import MobileMenu from "./MobileMenu";
import ModelSelect from "./ModelSelect";
import SideBar from "./SideBar";

export default function Header() {
  return (
    <header className="flex items-center p-2 sticky top-0 bg-white z-10">
      {/* 모바일 메뉴 영역 */}
      <MobileMenu>
        <SideBar />
      </MobileMenu>
      {/* 모델 선택 영역 */}
      <ModelSelect />
    </header>
  );
}
