import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Star, TrendingUp } from "lucide-react";
import { DashboardStats } from "@/types";

interface DashboardStatsProps {
  stats: DashboardStats;
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Stores",
      value: stats.totalStores,
      icon: Store,
      description: "Active stores",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Ratings",
      value: stats.totalRatings,
      icon: Star,
      description: "User reviews",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Average Rating",
      value:
        stats.totalStores > 0
          ? (stats.totalRatings / stats.totalStores).toFixed(1)
          : "0.0",
      icon: TrendingUp,
      description: "Overall average rating per store",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${card.bgColor}`}
              >
                <IconComponent className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStatsComponent;
