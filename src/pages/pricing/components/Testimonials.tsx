import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/hooks/useTranslate";
import { type Testimonial } from "@/types/models/membership";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const { tData } = useTranslate(); 
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Chia Sẻ Từ Người Dùng</h2>
        <p className="text-muted-foreground">
          Những câu chuyện thành công từ cộng đồng của chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{tData(testimonial.name)}</p>
                  <p className="text-sm text-muted-foreground">
                    {tData(testimonial.role)}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-5 h-5 ${
                      starIndex < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="italic">{tData(testimonial.content)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
