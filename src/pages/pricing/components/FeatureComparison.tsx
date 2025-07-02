import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { type ProgramFeature } from "@/types/models/membership";

interface FeatureComparisonProps {
  features: ProgramFeature[];
}

export function FeatureComparison({ features }: FeatureComparisonProps) {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">So Sánh Chi Tiết</h2>
        <p className="text-muted-foreground">
          Xem sự khác biệt giữa phiên bản miễn phí và trả phí
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full sm:min-w-[640px] table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium text-lg">
                Tính năng
              </th>
              <th className="text-center py-4 px-4 font-medium text-lg">
                Miễn phí
              </th>
              <th className="text-center py-4 px-4 font-medium text-lg">
                Trả phí
                <Badge className="ml-2 bg-primary">Khuyến nghị</Badge>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-border/60">
                <td className="py-3 px-4">
                  <div className="flex items-start">
                    <span className="font-medium">{feature.title}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </div>
                </td>

                <td className="py-3 px-4 text-center">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </td>

                <td className="py-3 px-4 text-center">
                  {feature.paid ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
