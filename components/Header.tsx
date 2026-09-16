import Image, { type StaticImageData } from "next/image";
import defaultLogo from "@/app/assets/images/logo.png";

export function Header({
  logo = defaultLogo,
  logoAlt = "The Millionaire Contractor Coach",
}: {
  logo?: StaticImageData;
  logoAlt?: string;
}) {
  return (
    <header className="flex items-center px-6 py-3">
      <Image src={logo} alt={logoAlt} className="h-9 w-auto" priority />
    </header>
  );
}
