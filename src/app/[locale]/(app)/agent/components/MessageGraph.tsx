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
        }

        // Transform message graph data to visualization configuration format
        const config: IVisualizationConfiguration<any> = {
            title: message.graph.title,
            categories: message.graph.x.map(String), // Convert to string array for x-axis categories
            series: message.graph.y_label.map((label) => ({
                name: label,
                data: message.graph!.y.map((value) => {
                    // If we have multiple series, we need to handle the data differently
                    // For now, assuming single series or the y data is already structured properly
                    return typeof value === 'number' ? value : parseFloat(String(value)) || 0;
                })
            }))
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