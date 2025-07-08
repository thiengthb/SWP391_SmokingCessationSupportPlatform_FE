const hourUnit = 60 * 60;
const dayUnit = 24 * hourUnit;

export interface HealthImprovementLevel {
    value: number;
    title: string;
    description: string;
};

export const getHealthImprovementLevel = (value: number): HealthImprovementLevel | null => {
    for (const level of healthImprovementLevels) {
        if (value >= level.value) {  
            return level;
        } 
    }
    return null;
};

export const healthImprovementLevels: HealthImprovementLevel[] = [
    {
        value: hourUnit,
        title: "1 giờ không hút thuốc",
        description: "Nhịp tim và huyết áp bắt đầu trở về bình thường",
    },
    {
        value: dayUnit,
        title: "1 ngày không hút thuốc",
        description: "Nồng độ CO trong máu đã giảm về mức bình thường",
    },
    {
        value: 2 * dayUnit,
        title: "2 ngày không hút thuốc",
        description: "Khứu giác và vị giác bắt đầu cải thiện",
    },
    {
        value: 7 * dayUnit,
        title: "1 tuần không hút thuốc",
        description: "Tuần hoàn máu cải thiện, phổi bắt đầu tự làm sạch",
    },
    {
        value: 30 * dayUnit,
        title: "1 tháng không hút thuốc",
        description: "Chức năng phổi tăng lên đáng kể",
    },
    {
        value: 90 * dayUnit,
        title: "3 tháng không hút thuốc",
        description: "Tuần hoàn máu và chức năng phổi được cải thiện tốt",
    },
    {
        value: 365 * dayUnit,
        title: "1 năm không hút thuốc",
        description: "Nguy cơ bệnh tim giảm đi một nửa",
    }
];