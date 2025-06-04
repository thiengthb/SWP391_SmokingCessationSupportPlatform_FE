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

export function LeaderboardTabs({ onFilterChange, onPeriodChange }: LeaderboardTabsProps) {
  const [currentTab, setCurrentTab] = useState("global");

  return (
    <Tabs 
      defaultValue="global" 
      className="mb-8"
      onValueChange={(value) => setCurrentTab(value)}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between mb-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="global">Global Rankings</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Leaders</TabsTrigger>
        </TabsList>

        <div className="w-full flex flex-col items-end gap-4">
          <Select onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          {currentTab === "monthly" && (
            <Select onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="previous">Previous Months</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <TabsContent value="global" className="mt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Global Leaders</h3>
          <p className="text-sm text-muted-foreground">
            Updated in real-time
          </p>
        </div>
      </TabsContent>

      <TabsContent value="monthly" className="mt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Monthly Champions</h3>
          <p className="text-sm text-muted-foreground">
            Rankings reset monthly
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
