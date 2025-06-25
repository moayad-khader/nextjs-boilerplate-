"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "@/types/message";
import { Visualization } from "@/components/visualization";
import { useMemo } from "react";
import type { IVisualizationConfiguration, VisualizationTypes } from "@/lib/factories/visualization.factory/types";

type MessageGraphComponentProps = {
    message: Message
};

export default function MessageGraphComponent({ message }: MessageGraphComponentProps) {
    const visualizationConfig = useMemo(() => {
        if (!message.graph) {
            return null;
        }        // Ensure we have the required data
        if (!message.graph.x || !message.graph.y || !message.graph.y_label) {
            return null;
        }

        // Transform message graph data to visualization configuration format
        const config: IVisualizationConfiguration = {
            title: message.graph.title,
            categories: message.graph.x.map(String), // Convert to string array for x-axis categories
            series: message.graph.y_label.map((label, seriesIndex) => {
                // Handle different data structures for y values
                let seriesData: number[];

                if (Array.isArray(message.graph!.y[0])) {
                    // If y is an array of arrays (multiple series)
                    const ySeriesData = message.graph!.y[seriesIndex];
                    if (Array.isArray(ySeriesData)) {
                        seriesData = ySeriesData.map(value =>
                            typeof value === 'number' ? value : parseFloat(String(value)) || 0
                        );
                    } else {
                        // Fallback: use the single value
                        seriesData = [typeof ySeriesData === 'number' ? ySeriesData : parseFloat(String(ySeriesData)) || 0];
                    }
                } else {
                    // If y is a flat array, handle based on number of series
                    if (message.graph!.y_label.length === 1) {
                        // Single series: use all y data
                        seriesData = message.graph!.y.map((value) =>
                            typeof value === 'number' ? value : parseFloat(String(value)) || 0
                        );
                    } else {
                        // Multiple series with flat array: split data evenly or duplicate
                        // For now, use the same data for all series (may need adjustment based on actual data structure)
                        seriesData = message.graph!.y.map((value) =>
                            typeof value === 'number' ? value : parseFloat(String(value)) || 0
                        );
                    }
                }

                return {
                    name: label,
                    data: seriesData
                };
            })
        };

        return config;
    }, [message.graph]);

    // If no graph data, don't render anything
    if (!message.graph || !visualizationConfig) {
        return null;
    }


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{message.graph.title}</CardTitle>
                <CardDescription>
                    {message.graph.x_label && `X-axis: ${message.graph.x_label}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <Visualization
                    visualization_type={message.graph.visualization_type as VisualizationTypes}
                    title={message.graph.title}
                    visualization_configuration={visualizationConfig}
                    className="h-full"
                />
            </CardContent>
        </Card>
    );
}