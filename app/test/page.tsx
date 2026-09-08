import type { Metadata } from "next";
import MultiStepForm from "@/components/MultiStepForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return <MultiStepForm testMode />;
}
