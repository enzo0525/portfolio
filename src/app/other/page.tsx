import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Other",
};

export default function OtherPage() {
  return (
    <div>
      <BackLink href="/" label="home" />

      <h1 className="text-[18px] font-semibold mb-8">other</h1>

      <div className="mb-8">
        <p className="text-text-muted mb-2">connect</p>
        <div className="flex flex-col gap-1 leading-relaxed">
          <a href={`mailto:${personal.email}`}>→ email</a>
          <a href={personal.social.github} target="_blank" rel="noopener noreferrer">
            → github
          </a>
          <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">
            → linkedin
          </a>
          <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer">
            → twitter / x
          </a>
        </div>
      </div>

      <div>
        <p className="text-text-muted mb-2">misc</p>
        <div className="flex flex-col gap-1 leading-relaxed">
          <a href={personal.sourceCode} target="_blank" rel="noopener noreferrer">
            → source code
          </a>
        </div>
      </div>
    </div>
  );
}
