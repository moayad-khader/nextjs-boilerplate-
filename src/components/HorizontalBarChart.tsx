'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { DistrictData } from '@/types/liveboard'

interface HorizontalBarChartProps {
    data: DistrictData[]
    className?: string
}

export function HorizontalBarChart({ data, className }: HorizontalBarChartProps) {
    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US').format(value)
    }

    const maxValue = Math.max(...data.map(d => d.value))

    return (
        <div className={className}>
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        {/* Arabic name */}
                        <div className="w-24 text-right text-sm text-muted-foreground flex-shrink-0">
                            {item.nameAr}
                        </div>

                        {/* Bar visualization */}
                        <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                            <div
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: item.color
                                }}
                            />
                        </div>

                        {/* Value */}
                        <div className="w-32 text-right text-sm font-medium flex-shrink-0">
                            {formatNumber(item.value)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded bg-gray-400" />
                    <span>Total Penalty</span>
                </div>
            </div>
        </div>
    )
}
