'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Info } from 'lucide-react'
import { KPICardData } from '@/types/liveboard'
import { cn } from '@/lib/utils'

interface KPICardProps {
    data: KPICardData
    className?: string
}

export function KPICard({ data, className }: KPICardProps) {
    const { title, currentValue, currency = 'SAR', percentageChange, previousValue, isPositive = true } = data

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num)
    }

    const percentageColor = isPositive ? 'text-green-600' : 'text-red-600'
    const percentageBg = isPositive ? 'bg-green-100' : 'bg-red-100'

    return (
        <Card className={cn('relative', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-cyan-500" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {title}
                    </CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="text-2xl font-bold">
                    {formatNumber(currentValue)}
                </div>
                <div className="text-xs text-muted-foreground">
                    Current period
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last period:</span>
                    <span className="text-sm font-medium">{formatNumber(previousValue)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">vs last period</span>
                    <div className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        percentageBg,
                        percentageColor
                    )}>
                        {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
