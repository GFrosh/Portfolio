import { GitBranch, Link as LinkIcon, Mail, MessageCircle, type LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
  icon: LucideIcon;
  /** Present when the value still needs confirmation from Gideon. */
  placeholder?: string;
};

/** Order is deliberate: Email, LinkedIn, GitHub, WhatsApp. */
export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:hello@devgideon.me",
    handle: "hello@devgideon.me",
    icon: Mail,
    placeholder:
      "[PLACEHOLDER: confirm hello@devgideon.me exists, receives mail, and replaces the old Gmail address]",
  },
  {
    label: "LinkedIn",
    href: "https://ng.linkedin.com/in/gideon-onyegbula-38b510380",
    handle: "gideon-onyegbula",
    icon: LinkIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/GFrosh",
    handle: "GFrosh",
    icon: GitBranch,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348137960057",
    handle: "+234 813 796 0057",
    icon: MessageCircle,
  },
];

/**
 * X is intentionally NOT rendered. Flip to true only once the handle is
 * confirmed active and dev-focused.
 */
export const X_ENABLED = false;

export const xLink = {
  label: "X",
  href: "https://x.com/DevThragg",
  handle: "@DevThragg",
  placeholder:
    "[PLACEHOLDER: confirm @DevThragg is active and dev-focused, then set X_ENABLED = true in content/links.ts — otherwise leave it off]",
};

/** Résumé — file has not been supplied yet. */
export const resume = {
  href: "/resume/gideon-onyegbula-resume.pdf",
  fileName: "gideon-onyegbula-resume.pdf",
  placeholder: "[PLACEHOLDER: résumé PDF — place the file at public/resume/gideon-onyegbula-resume.pdf]",
};
