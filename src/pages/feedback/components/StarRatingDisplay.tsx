import { Star } from "lucide-react";
import { clsx } from "clsx";

export default function StarRatingDisplay({ value }: { value: number }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={clsx(
            "h-5 w-5",
            star <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}
