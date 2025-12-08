import { SVGProps } from "react";

type OAuthIcons = "google" | "naver";

export type Icons = OAuthIcons;

type IconProps = {
  icon: Icons;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & SVGProps<SVGSVGElement>;

function SvgIcon({ icon, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/icons/sprite.svg#${icon}`} />
    </svg>
  );
}

export function Icon({ icon, size }: IconProps) {
  let dimension;
  switch (size) {
    case "xs":
      dimension = 12;
      break;
    case "sm":
      dimension = 16;
      break;
    case "md":
      dimension = 20;
      break;
    case "lg":
      dimension = 24;
      break;
    case "xl":
      dimension = 32;
      break;
    default:
      dimension = 20;
  }

  switch (icon) {
    case "google":
    case "naver":
      return <SvgIcon icon={icon} width={dimension} height={dimension} />;
  }
}
