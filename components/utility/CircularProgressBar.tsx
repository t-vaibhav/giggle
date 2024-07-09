import React from "react";

interface CircularProgressBarProps {
    percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    percentage,
}) => {
    const radius = 16;
    const stroke = 8;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2} className="block">
            <circle
                stroke="lightgray"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="circle-bg"
            />
            <circle
                stroke="green"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="circle-progress"
            />
            <text
                x="50%"
                y="52%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="15"
                fill="black"
                className="text-center text-xs font-medium text-gray-100"
            >
                {percentage}%
            </text>
        </svg>
    );
};

export default CircularProgressBar;
