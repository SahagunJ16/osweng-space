import { hubApps } from "@/config/apps";

import { AppCard } from "./app-card";

export function AppGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {hubApps.map((app) => (
        <AppCard key={app.name} app={app} />
      ))}
    </section>
  );
}
