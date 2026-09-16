import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

// Not present in the Figma frame at all — added since every live page
// needs one. Keep it minimal; swap in real links as needed.
export function Footer() {
  return (
    <footer className="px-6 py-10 text-center">
      <Image
        src={logo}
        alt="The Millionaire Contractor Coach"
        className="mx-auto h-7 w-auto opacity-70"
      />
      <p className="mt-4 font-sans text-xs text-black/40">
        © 2026 The Millionaire Contractor Coach. All rights reserved.
      </p>
    </footer>
  );
}
