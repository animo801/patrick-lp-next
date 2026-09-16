import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

export function Header() {
  return (
    <header className="flex items-center px-6 py-3">
      <Image
        src={logo}
        alt="The Millionaire Contractor Coach"
        className="h-9 w-auto"
        priority
      />
    </header>
  );
}
