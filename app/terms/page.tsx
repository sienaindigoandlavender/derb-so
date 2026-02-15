import NexusLegalPage from "@/components/NexusLegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Derb",
  description: "Terms of service for derb.so",
};

export default function TermsPage() {
  return <NexusLegalPage pageId="terms" fallbackTitle="Terms of Service" />;
}
