import { ArrowUpRight } from "lucide-react";

import { Badge } from "@osweng-space/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@osweng-space/ui/components/card";

import type { HubApp } from "@/config/apps";

type AppCardProps = {
  app: HubApp;
};

export function AppCard({ app }: AppCardProps) {
  return (
    <a href={app.href} target="_blank" rel="noreferrer">
      <Card className="group h-full transition hover:-translate-y-1 hover:border-zinc-400">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle>{app.name}</CardTitle>
            <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-foreground" />
          </div>
          <CardDescription>{app.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <Badge variant="secondary">{app.status}</Badge>
        </CardContent>
      </Card>
    </a>
  );
}
