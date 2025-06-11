"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Message } from "../page";



const data = [
    {
        name: 'Jan',
        messages: 4000,
        responses: 2400,
    },
    {
        name: 'Feb',
        messages: 3000,
        responses: 1398,
    },
    {
        name: 'Mar',
        messages: 2000,
        responses: 9800,
    },
    {
        name: 'Apr',
        messages: 2780,
        responses: 3908,
    },
    {
        name: 'May',
        messages: 1890,
        responses: 4800,
    },
    {
        name: 'Jun',
        messages: 2390,
        responses: 3800,
    },
];

type MewssageGraphComponentProps = {
    message: Message
};

export default function MessageGraphComponent({ message }: MewssageGraphComponentProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Message Analytics</CardTitle>
                <CardDescription>
                    Monthly message and response statistics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="messages"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="responses"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}