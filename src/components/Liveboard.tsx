'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { KPICard } from '@/components/KPICard'
import { HorizontalBarChart } from '@/components/HorizontalBarChart'
import { LiveboardData } from '@/types/liveboard'
import { cn } from '@/lib/utils'

interface LiveboardProps {
    data: LiveboardData
    className?: string
}

export function Liveboard({ data, className }: LiveboardProps) {
    return (
        <div className={cn(className)}>
            {/* Header */}
            <div className="bg-gradient-light-topbar border-b p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">{data.title}</h1>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            <div className="p-6 space-y-6">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.kpis.map((kpi, index) => (
                        <KPICard key={index} data={kpi} />
                    ))}
                </div>

                {/* Statistics Chart */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="space-y-1">
                            <CardTitle className="text-base">{data.statisticsTitle}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <select className="text-sm border border-gray-200 rounded px-2 py-1 bg-white">
                                <option>By District</option>
                            </select>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <HorizontalBarChart data={data.districtData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
