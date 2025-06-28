import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { LeaderboardTabsProps } from "@/types/leaderboard";
import { useTranslation } from "react-i18next";

export function LeaderboardTabs({
  onFilterChange,
  onPeriodChange,
}: LeaderboardTabsProps) {
  const [currentTab, setCurrentTab] = useState("global");
  const { t } = useTranslation();
  return (
    <Tabs
      defaultValue="global"
      className="mb-8"
      onValueChange={(value) => setCurrentTab(value)}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between mb-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="global">
            {t("page.leaderboard.tabs.global")}
          </TabsTrigger>
          <TabsTrigger value="monthly">
            {t("page.leaderboard.tabs.monthly")}
          </TabsTrigger>
        </TabsList>

        <div className="w-full flex flex-col items-end gap-4">
          <Select onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={t("page.leaderboard.filter.placeholder")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("page.leaderboard.filter.all")}
              </SelectItem>
              <SelectItem value="week">
                {t("page.leaderboard.filter.week")}
              </SelectItem>
              <SelectItem value="month">
                {t("page.leaderboard.filter.month")}
              </SelectItem>
              <SelectItem value="year">
                {t("page.leaderboard.filter.year")}
              </SelectItem>
            </SelectContent>
          </Select>

          {currentTab === "monthly" && (
            <Select onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={t("page.leaderboard.period.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">
                  {t("page.leaderboard.period.current")}
                </SelectItem>
                <SelectItem value="last">
                  {t("page.leaderboard.period.last")}
                </SelectItem>
                <SelectItem value="previous">
                  {t("page.leaderboard.period.previous")}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <TabsContent value="global" className="mt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {" "}
            {t("page.leaderboard.global.title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {" "}
            {t("page.leaderboard.global.description")}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="monthly" className="mt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {" "}
            {t("page.leaderboard.monthly.title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("page.leaderboard.monthly.description")}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
