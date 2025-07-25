import Image from "next/image";
export function Logo() {
  return (
    <>
      <Image src="/logo.svg" alt="Mastersel Icon" height={30} width={30} />
    </>
  );
}
