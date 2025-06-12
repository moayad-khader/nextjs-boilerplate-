"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "./types";
import { Visualization } from "@/components/visualization";
import { type IVisualizationConfiguration } from "@/lib/factories/visualization.factory/types";

type MessageGraphComponentProps = {
    message: Message
};

export default function MessageGraphComponent({ message }: MessageGraphComponentProps) {
    if (!message.graph) {
        return null;
    }

    const visualization_configuration: IVisualizationConfiguration<{ name: string; data: number[] }> = {
        title: "Message Analytics",
        categories: message.graph.graphData.map(item => item.name),
        series: [
            {
                name: 'Messages',
                data: message.graph.graphData.map(item => item.messages)
            },
            {
                name: 'Responses',
                data: message.graph.graphData.map(item => item.responses)
            }
        ]
    };

    // Map graphType number to visualization type
    const getVisualizationType = (type: number) => {
        switch (type) {
            case 1:
                return 'line';
            case 2:
                return 'bar';
            case 3:
                return 'pie';
            default:
                return 'line';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Message Analytics</CardTitle>
                <CardDescription>
                    Monthly message and response statistics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Visualization
                    visualization_type={getVisualizationType(message.graph.graphType)}
                    visualization_configuration={visualization_configuration}
                    title="Message Analytics"
                />
            </CardContent>
        </Card>
    );
}