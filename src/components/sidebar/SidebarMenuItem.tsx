import Link from "next/link";

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
  return <Link href={to}>Dashboard </Link>;
};
