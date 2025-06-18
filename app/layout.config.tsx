import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LeafIcon } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { SiDiscord as Discord } from "@icons-pack/react-simple-icons";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <div className={`${geistMono.className} text-2xl font-bold`}>
          pricecn
        </div>
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      icon: <Discord />,
      text: "Community",
      url: "https://discord.gg/STqxY92zuS",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
    {
      icon: <LeafIcon />,
      text: "Autumn",
      url: "https://useautumn.com/",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
  ],
  githubUrl: "https://github.com/useautumn/pricecn",
};
