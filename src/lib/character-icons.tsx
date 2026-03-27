import type { LucideIcon } from "lucide-react";
import {
  Copy,
  Droplets,
  Eye,
  Flame,
  Heart,
  HeartPulse,
  MessageCircle,
  Shield,
  UserRound,
} from "lucide-react";

/** Lucide icons for character bible archetypes (no emoji). */
export const CHARACTER_ICONS: Record<string, LucideIcon> = {
  "aoife-kelleher": UserRound,
  "mrs-keane": Flame,
  "ciaran-doyle": Heart,
  "fiona-walsh": MessageCircle,
  "sean-murphy": Shield,
  "padraig-flynn": Droplets,
  "niamh-byrne": Eye,
  "erin-oconnell": HeartPulse,
  "aoife-kelleher-double": Copy,
};

export function CharacterBibleIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = CHARACTER_ICONS[slug];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
