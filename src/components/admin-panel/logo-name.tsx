import Image from "next/image";
export function LogoName() {
  return (
    <>
      <Image
        src="/logo-name.svg"
        alt="Mastersel Logo"
        height={30}
        width={150}
      />
    </>
  );
}
