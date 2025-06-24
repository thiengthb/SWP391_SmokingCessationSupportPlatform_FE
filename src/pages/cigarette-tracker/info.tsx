import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Brain, 
  Calendar, 
  Activity, 
  Clock,
  BarChart3,
  Plus,
  ExternalLink,
  Wind
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const healthTimeline = [
  { time: '20 phút', description: 'Nhịp tim và huyết áp bắt đầu trở lại bình thường.' },
  { time: '12 giờ', description: 'Mức carbon monoxide trong máu trở về mức bình thường.' },
  { time: '2-3 ngày', description: 'Các đầu dây thần kinh bắt đầu tái tạo và khả năng ngửi và nếm được cải thiện.' },
  { time: '1-3 tháng', description: 'Lưu thông máu được cải thiện và chức năng phổi tăng lên.' },
  { time: '1-9 tháng', description: 'Giảm ho, nghẹt mũi và khó thở. Phổi bắt đầu phục hồi và loại bỏ chất nhầy.' },
  { time: '1 năm', description: 'Nguy cơ mắc bệnh tim mạch vành giảm 50% so với người hút thuốc.' },
  { time: '5 năm', description: 'Nguy cơ đột quỵ giảm xuống ngang bằng với người không hút thuốc.' },
  { time: '10 năm', description: 'Nguy cơ ung thư phổi giảm còn một nửa so với người hút thuốc.' },
  { time: '15 năm', description: 'Nguy cơ bệnh tim mạch vành tương đương với người không hút thuốc.' },
];

const statistics = [
  { stat: 'Hơn 8 triệu', description: 'Người chết mỗi năm vì các bệnh liên quan đến thuốc lá.' },
  { stat: '70%', description: 'Người hút thuốc muốn từ bỏ thuốc lá.' },
  { stat: '7,000+', description: 'Hoá chất trong khói thuốc lá, trong đó hơn 70 chất gây ung thư.' },
  { stat: 'Giảm 10 năm', description: 'Tuổi thọ trung bình của người hút thuốc so với người không hút.' },
];

export default function CigaretteHealthInfo() {
  return (
    <div className="container py-10">
      <div className="space-y-2 mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Thông Tin Sức Khoẻ</h1>
        <p className="text-muted-foreground">
          Hiểu về tác hại của thuốc lá và lợi ích của việc bỏ thuốc
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Tác hại của thuốc lá
            </CardTitle>
            <CardDescription>
              Thuốc lá ảnh hưởng đến hầu như mọi cơ quan trong cơ thể
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lungs">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="lungs" className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  <span>Phổi</span>
                </TabsTrigger>
                <TabsTrigger value="heart" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Tim</span>
                </TabsTrigger>
                <TabsTrigger value="brain" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>Não</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lungs" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://www.cdc.gov/tobacco/campaign/tips/resources/images/diseases-conditions/lungs-illustration.jpg" 
                    alt="Tác hại đến phổi" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">Tác hại đến phổi</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Ung thư phổi - Thuốc lá gây ra tới 90% các ca tử vong do ung thư phổi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Bệnh phổi tắc nghẽn mãn tính (COPD) bao gồm viêm phế quản mãn tính và khí phế thũng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Tăng nguy cơ nhiễm trùng đường hô hấp và làm trầm trọng các triệu chứng hen suyễn</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="heart" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://www.nhlbi.nih.gov/sites/default/files/styles/hero_image_default/public/2022-04/Heart-attack-web.jpg" 
                    alt="Tác hại đến tim" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">Tác hại đến tim mạch</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Bệnh mạch vành dẫn đến đau thắt ngực và đau tim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Tăng huyết áp và làm tăng nhịp tim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Tăng nguy cơ đột quỵ do tắc nghẽn mạch máu hoặc xuất huyết não</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="brain" className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://www.hopkinsmedicine.org/-/media/images/health/3_-wellness/brain-health/brainstrokeunderstanding.jpg" 
                    alt="Tác hại đến não" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="font-semibold">Tác hại đến não bộ</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Nicotine gây nghiện và thay đổi hoạt động của não</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Tăng nguy cơ đột quỵ với khả năng gây tổn thương não vĩnh viễn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">•</div>
                    <span>Nghiên cứu cho thấy liên quan giữa hút thuốc và tăng nguy cơ mắc bệnh Alzheimer</span>
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
              Lợi ích khi bỏ thuốc lá
            </CardTitle>
            <CardDescription>
              Cơ thể bắt đầu phục hồi ngay sau khi bạn bỏ thuốc
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Thời gian phục hồi</h3>
                  <p className="text-sm text-muted-foreground">Những thay đổi tích cực sẽ diễn ra theo thời gian</p>
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
                      <p className="text-sm text-muted-foreground">{item.description}</p>
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
              Thống kê về thuốc lá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.map((item, index) => (
                <div key={index} className="text-center p-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-primary">{item.stat}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="font-semibold">Lợi ích kinh tế từ việc bỏ thuốc</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tiết kiệm sau 1 tháng</span>
                    <span className="font-medium">~ 900.000đ</span>
                  </div>
                  <Progress value={33} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tiết kiệm sau 1 năm</span>
                    <span className="font-medium">~ 10.800.000đ</span>
                  </div>
                  <Progress value={66} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Chi phí y tế giảm</span>
                    <span className="font-medium">Không ước tính được</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tiết kiệm sau 10 năm</span>
                    <span className="font-medium">~ 108.000.000đ</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                *Tính toán dựa trên mức hút 1 gói thuốc mỗi ngày với giá 30.000đ/gói
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Bắt đầu theo dõi thói quen hút thuốc của bạn</CardTitle>
            <CardDescription>
              Bước đầu tiên để bỏ thuốc lá là hiểu được thói quen hiện tại của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button asChild className="w-full md:w-auto" size="lg">
                <Link to="/cigarette-tracker" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Bắt đầu theo dõi ngay</span>
                </Link>
              </Button>              <div className="flex flex-col md:flex-row gap-2">
                <Button variant="outline" className="w-full md:w-auto" asChild>
                  <a 
                    href="https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cac-phuong-phap-cai-thuoc-la-hieu-qua/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Tìm hiểu cách bỏ thuốc lá</span>
                  </a>
                </Button>
                <Button variant="default" className="w-full md:w-auto" asChild>
                  <a href="/quit-smoking-plan" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Lập kế hoạch cai thuốc</span>
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