"use client";

import React, { useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { PeriodRecord } from "@/app/types/period";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PeriodStatsProps = {
    data: PeriodRecord[];
};

export default function PeriodStats({ data }: PeriodStatsProps) {
    const [mode, setMode] = useState<"all" | "year">("all");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [shakeId, setShakeId] = useState<number | null>(null);

    const years = Array.from(
        new Set(data.map((p) => new Date(p.start).getFullYear()))
    ).sort();

    const filteredData =
        mode === "year" && selectedYear
            ? data.filter((p) => new Date(p.start).getFullYear() === selectedYear)
            : data;

    // 计算周期
    const cycles: { start: string; length: number }[] = [];
    filteredData.forEach((p, i) => {
        if (i === 0) return;
        const prev = new Date(filteredData[i - 1].start);
        const curr = new Date(p.start);
        const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
        if (diff >= 15 && diff <= 90) {
            cycles.push({ start: p.start, length: diff });
        }
    });

    const avgCycle = cycles.length
        ? Math.round(cycles.reduce((sum, c) => sum + c.length, 0) / cycles.length)
        : 0;
    const minCycle = cycles.length ? Math.min(...cycles.map((c) => c.length)) : 0;
    const maxCycle = cycles.length ? Math.max(...cycles.map((c) => c.length)) : 0;

    return (
        <div className="my-6 space-y-6">
            {/* Mode Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
                <Button
                    variant={mode === "all" ? "default" : "outline"}
                    className="rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 min-w-[100px]"
                    onClick={() => {
                        setMode("all");
                        setSelectedYear(null);
                    }}
                >
                    All Years
                </Button>
                <Button
                    variant={mode === "year" ? "default" : "outline"}
                    className="rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 min-w-[100px]"
                    onClick={() => setMode("year")}
                >
                    By Year
                </Button>
                {mode === "year" && (
                    <select
                        className="ml-2 border border-pink-200 rounded-full px-3 py-1 text-pink-700 font-semibold"
                        value={selectedYear ?? ""}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            Select Year
                        </option>
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 rounded-2xl shadow-lg text-center">
                    <CardContent>
                        <p className="text-sm text-pink-400">Average Cycle</p>
                        <p className="text-2xl font-bold text-pink-500">{avgCycle} days</p>
                    </CardContent>
                </Card>
                <Card className="p-6 rounded-2xl shadow-lg text-center">
                    <CardContent>
                        <p className="text-sm text-pink-400">Shortest Cycle</p>
                        <p className="text-2xl font-bold text-pink-500">{minCycle} days</p>
                    </CardContent>
                </Card>
                <Card className="p-6 rounded-2xl shadow-lg text-center">
                    <CardContent>
                        <p className="text-sm text-pink-400">Longest Cycle</p>
                        <p className="text-2xl font-bold text-pink-500">{maxCycle} days</p>
                    </CardContent>
                </Card>
            </div>
            {/* Line Chart */}
            <Card className="py-4 rounded-2xl shadow-lg">
                <CardContent>
                    <p className="text-sm text-pink-400 mb-2">
                        Cycle Length Trend {mode === "year" && selectedYear ? `(${selectedYear})` : ""}
                    </p>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={cycles}>
                            <Line
                                type="monotone"
                                dataKey="length"
                                stroke="#ec4899"
                                strokeWidth={3}
                                dot={{
                                    r: 10,
                                    fill: "#fbb6ce",
                                    stroke: "#ec4899",
                                    strokeWidth: 2,
                                    onClick: (e, idx) => {
                                        // setShakeId(idx);
                                        setTimeout(() => setShakeId(null), 500);
                                    },
                                }}
                            />
                            <CartesianGrid stroke="#ffe4ec" strokeDasharray="3 3" />
                            <XAxis dataKey="start" hide />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#ffe4ec", borderRadius: 12 }}
                                itemStyle={{ color: "#ec4899" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <style jsx>{`
        .animate-ping {
          animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
        </div>
    );
}
