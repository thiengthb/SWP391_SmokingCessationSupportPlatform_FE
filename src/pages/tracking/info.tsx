import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Brain,
  Calendar,
  Activity,
  Clock,
  BarChart3,
  Plus,
  ExternalLink,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

const healthTimeline = [
  {
    time: "20 phút",
    description: "Nhịp tim và huyết áp bắt đầu trở lại bình thường.",
  },
  {
    time: "12 giờ",
    description: "Mức carbon monoxide trong máu trở về mức bình thường.",
  },
  {
    time: "2-3 ngày",
    description:
      "Các đầu dây thần kinh bắt đầu tái tạo và khả năng ngửi và nếm được cải thiện.",
  },
  {
    time: "1-3 tháng",
    description: "Lưu thông máu được cải thiện và chức năng phổi tăng lên.",
  },
  {
    time: "1-9 tháng",
    description:
      "Giảm ho, nghẹt mũi và khó thở. Phổi bắt đầu phục hồi và loại bỏ chất nhầy.",
  },
  {
    time: "1 năm",
    description:
      "Nguy cơ mắc bệnh tim mạch vành giảm 50% so với người hút thuốc.",
  },
  {
    time: "5 năm",
    description:
      "Nguy cơ đột quỵ giảm xuống ngang bằng với người không hút thuốc.",
  },
  {
    time: "10 năm",
    description:
      "Nguy cơ ung thư phổi giảm còn một nửa so với người hút thuốc.",
  },
  {
    time: "15 năm",
    description:
      "Nguy cơ bệnh tim mạch vành tương đương với người không hút thuốc.",
  },
];

const statistics = [
  {
    stat: "Hơn 8 triệu",
    description: "Người chết mỗi năm vì các bệnh liên quan đến thuốc lá.",
  },
  { stat: "70%", description: "Người hút thuốc muốn từ bỏ thuốc lá." },
  {
    stat: "7,000+",
    description:
      "Hoá chất trong khói thuốc lá, trong đó hơn 70 chất gây ung thư.",
  },
  {
    stat: "Giảm 10 năm",
    description:
      "Tuổi thọ trung bình của người hút thuốc so với người không hút.",
  },
];

export default function CigaretteHealthInfo() {
  const { t } = useTranslation();
  return (
    <div className="container py-10">
      <div className="space-y-2 mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("cigarett-tracker2.health.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("cigarett-tracker2.health.description")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t("cigarett-tracker2.health.harm.title")}
            </CardTitle>
            <CardDescription>
              {t("cigarett-tracker2.health.harm.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lungs">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="lungs" className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  <span>{t("cigarett-tracker2.health.tabs.lungs")}</span>
                </TabsTrigger>
                <TabsTrigger value="heart" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{t("cigarett-tracker2.health.tabs.heart")}</span>
                </TabsTrigger>
                <TabsTrigger value="brain" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>{t("cigarett-tracker2.health.tabs.brain")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lungs" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://www.cdc.gov/tobacco/campaign/tips/resources/images/diseases-conditions/lungs-illustration.jpg"
                    alt={t("cigarett-tracker2.health.harm.lungs.title")}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">
                  {t("cigarett-tracker2.health.harm.lungs.title")}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.lungs.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.lungs.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.lungs.3")}</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="heart" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://www.nhlbi.nih.gov/sites/default/files/styles/hero_image_default/public/2022-04/Heart-attack-web.jpg"
                    alt={t("cigarett-tracker2.health.harm.heart.title")}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">
                  {t("cigarett-tracker2.health.harm.heart.title")}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.heart.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.heart.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.heart.3")}</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="brain" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://www.hopkinsmedicine.org/-/media/images/health/3_-wellness/brain-health/brainstrokeunderstanding.jpg"
                    alt={t("cigarett-tracker2.health.harm.brain.title")}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">
                  {t("cigarett-tracker2.health.harm.brain.title")}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.brain.1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.brain.2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>{t("cigarett-tracker2.health.harm.brain.3")}</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {t("cigarett-tracker2.health.benefit.title")}
            </CardTitle>
            <CardDescription>
              {t("cigarett-tracker2.health.benefit.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {t("cigarett-tracker2.health.benefit.timeline.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("cigarett-tracker2.health.benefit.timeline.description")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                {healthTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className="absolute top-0 left-3 w-px h-full bg-muted" />
                      <div className="relative z-10 w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-medium">{item.time}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {t("cigarett-tracker2.health.statistics.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center"
                >
                  <p className="text-3xl font-bold text-primary">{item.stat}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="font-semibold">
                {t("cigarett-tracker2.health.economic.title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      {t("cigarett-tracker2.health.economic.save1month")}
                    </span>
                    <span className="font-medium">~ 900.000đ</span>
                  </div>
                  <Progress value={33} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      {t("cigarett-tracker2.health.economic.save1year")}
                    </span>
                    <span className="font-medium">~ 10.800.000đ</span>
                  </div>
                  <Progress value={66} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      {t("cigarett-tracker2.health.economic.medical")}
                    </span>
                    <span className="font-medium">
                      {t("cigarett-tracker2.health.economic.unknown")}
                    </span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      {t("cigarett-tracker2.health.economic.save10year")}
                    </span>
                    <span className="font-medium">~ 108.000.000đ</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                {t("cigarett-tracker2.health.economic.note")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>{t("cigarett-tracker2.health.tracker.title")}</CardTitle>
            <CardDescription>
              {t("cigarett-tracker2.health.tracker.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button asChild className="w-full md:w-auto" size="lg">
                <Link to="/cigarette-tracker" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>{t("cigarett-tracker2.health.tracker.start")}</span>
                </Link>
              </Button>{" "}
              <div className="flex flex-col md:flex-row gap-2">
                <Button variant="outline" className="w-full md:w-auto" asChild>
                  <a
                    href="https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cac-phuong-phap-cai-thuoc-la-hieu-qua/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>
                      {t("cigarett-tracker2.health.tracker.link.quitMethod")}
                    </span>
                  </a>
                </Button>
                <Button variant="default" className="w-full md:w-auto" asChild>
                  <a href="/quit-smoking-plan" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {t("cigarett-tracker2.health.tracker.link.plan")}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
