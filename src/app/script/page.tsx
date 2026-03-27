import type { Metadata } from "next";
import { ScriptPageClient } from "@/components/script/script-page-client";

export const metadata: Metadata = {
  title: "Script",
};

export default function ScriptPage() {
  return <ScriptPageClient />;
}
