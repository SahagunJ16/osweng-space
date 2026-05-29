export type HubApp = {
  name: string;
  description: string;
  href: string;
  status: "available" | "planned";
};

export const hubApps: HubApp[] = [
  {
    name: "Portfolio",
    description:
      "My professional profile, projects, experience, and work background.",
    href: "https://portfolio.joshuasahagun.com",
    status: "planned",
  },
  {
    name: "Stash",
    description:
      "Joshua Sahagun’s personal stash of useful links, tools, references, and resources.",
    href: "https://stash.joshuasahagun.com",
    status: "planned",
  },
];
