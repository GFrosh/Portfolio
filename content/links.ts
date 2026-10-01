import { GitBranch, Link as LinkIcon, Mail, MessageCircle, type LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
  icon: LucideIcon;
  placeholder?: string;
};


export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:hello@devgideon.me",
    handle: "hello@devgideon.me",
    icon: Mail
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
  {
    label: "X",
    href: "https://x.com/DevThragg",
    handle: "@DevThragg",
    icon: MessageCircle,
  },
];

/**
 * X is intentionally NOT rendered. Flip to true only once the handle is
 * confirmed active and dev-focused.
 */
/* export const X_ENABLED = true;

export const xLink = {
  label: "X",
  href: "https://x.com/DevThragg",
  handle: "@DevThragg",
  icon: MessageCircle,
};
 */
/** Résumé — file has not been supplied yet. */
export const resume = {
  href: "/resume/gideon-onyegbula-resume.pdf",
  fileName: "gideon-onyegbula-resume.pdf",
  placeholder: "[PLACEHOLDER: résumé PDF — place the file at public/resume/gideon-onyegbula-resume.pdf]",
};
