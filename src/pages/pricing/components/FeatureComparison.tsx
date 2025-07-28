import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, X, Crown, Users } from "lucide-react";
import { motion } from "framer-motion";
import { type ProgramFeature } from "@/types/models/membership";
import { useTranslate } from "@/hooks/useTranslate";

interface FeatureComparisonProps {
  features: ProgramFeature[];
}

export function FeatureComparison({ features }: FeatureComparisonProps) {
  const { tData, tPricing } = useTranslate();

  return (
    <div className="mb-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
          {tPricing("pricing.features.title")}
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          {tPricing("pricing.features.description")}
        </p>
      </motion.div>

      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="shadow-xl border-0 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full sm:min-w-[640px] table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                  <th className="text-left py-6 px-6 font-semibold text-lg text-slate-800">
                    <div className="flex items-center gap-2">
                      {tPricing("pricing.features.items.feature")}
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-lg">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-slate-100 rounded-full p-2">
                        <Users className="h-5 w-5 text-slate-600" />
                      </div>
                      <span className="text-slate-800">
                        {tPricing("pricing.features.items.free")}
                      </span>
                      <Badge className="bg-slate-200 text-slate-700 text-xs">
                        Basic
                      </Badge>
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-semibold text-lg">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-full p-2">
                        <Crown className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                        {tPricing("pricing.features.items.paid")}
                      </span>
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs shadow-md">
                        {tPricing("pricing.features.items.badge")}
                      </Badge>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td className="py-5 px-6">
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800 text-base">
                          {tData(feature.title)}
                        </span>
                        <div className="text-sm text-slate-500 leading-relaxed">
                          {tData(feature.description)}
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center">
                        {feature.free ? (
                          <div className="bg-emerald-100 rounded-full p-2">
                            <Check className="h-5 w-5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="bg-red-100 rounded-full p-2">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center">
                        {feature.paid ? (
                          <div className="bg-emerald-100 rounded-full p-2 shadow-sm">
                            <Check className="h-5 w-5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="bg-slate-100 rounded-full p-2">
                            <X className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-6 border border-blue-100">
          <p className="text-sky-700 text-sm">
            💡 <strong>Pro Tip:</strong> Premium features are designed to
            accelerate your quit journey with personalized support and advanced
            tracking capabilities.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
