import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import "./ProgressChart.css";

// ===========================
// Chart Configuration
// ===========================

const CHART_CONFIG = {

    gapSize: 1,

    remainingColor: "#e5e7eb",
    gapColor: "#ffffff",

    innerRadius: 60,
    outerRadius: 95,

    startAngle: 90,
    endAngle: -270,

    animationDuration: 800,

};

// ===========================
// Progress Chart
// ===========================

function ProgressChart({ data }) {

    // ===========================
    // Build Chart Data
    // ===========================

    const chartData = [];

    data.segments.forEach((segment) => {

        chartData.push({
            name: `${segment.label}-completed`,
            value: segment.completed,
            color: segment.color,
        });

        chartData.push({
            name: `${segment.label}-remaining`,
            value: segment.remaining,
            color: CHART_CONFIG.remainingColor,
        });

        chartData.push({
            name: `${segment.label}-gap`,
            value: CHART_CONFIG.gapSize,
            color: CHART_CONFIG.gapColor,
        });

    });

    // ===========================
    // Custom Tooltip
    // ===========================

    const renderTooltip = ({ active, payload }) => {

        if (!active || !payload || payload.length === 0) {
            return null;
        }

        const entry = payload[0].payload;

        // Hide tooltip for gap slices

        if (entry.name.endsWith("-gap")) {
            return null;
        }

        // Find corresponding segment

        const segment = data.segments.find((segment) =>
            entry.name.startsWith(segment.label)
        );

        if (!segment) {
            return null;
        }

        return (

            <div
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >

                <div
                    style={{
                        fontWeight: 600,
                        marginBottom: "8px",
                    }}
                >
                    {segment.label}
                </div>

                <div>
                    Solved: {segment.completed} / {segment.total}
                </div>

                <div>
                    Progress: {segment.percentage}%
                </div>

            </div>

        );

    };

    // ===========================
    // JSX
    // ===========================

    return (

        <div className="progress-chart">

            <ResponsiveContainer>

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        innerRadius={CHART_CONFIG.innerRadius}
                        outerRadius={CHART_CONFIG.outerRadius}
                        stroke="none"
                        startAngle={CHART_CONFIG.startAngle}
                        endAngle={CHART_CONFIG.endAngle}
                        isAnimationActive
                        animationDuration={CHART_CONFIG.animationDuration}
                        animationEasing="ease-out"
                    >

                        {chartData.map((entry) => (

                            <Cell
                                key={entry.name}
                                fill={entry.color}
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        content={renderTooltip}
                    />

                    {/* Center Value */}

                    <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="22"
                        fontWeight="700"
                    >
                        {data.summary.completed} / {data.summary.total}
                    </text>

                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="15"
                        fill="#6b7280"
                    >
                        {data.summary.percentage}%
                    </text>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ProgressChart;