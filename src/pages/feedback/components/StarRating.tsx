import { useState } from "react";
import { Star } from "lucide-react";
import { clsx } from "clsx";

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export default function StarRatingInput({ value, onChange }: Props) {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={clsx(
                        "h-6 w-6 cursor-pointer transition-colors",
                        star <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                    )}
                    onClick={() => onChange(star)}
                />
            ))}
        </div>
    );
}
