import React, { useState } from 'react';
import { Message } from '../page';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface MessageReportComponentProps {
    message: Message
}

export default function MessageReportComponent({ message }: MessageReportComponentProps) {
    const [isOpen, setIsOpen] = useState(false);

    const reportContent = message.report?.content || 0;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Detailed Report
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Message Report</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <div>
                        <span className="font-semibold">Message ID:</span> {message.id || 'N/A'}
                    </div>

                    <div className="border-t pt-3">
                        <h3 className="font-semibold mb-2">Details</h3>
                        <div className="text-sm space-y-1">
                            {reportContent}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >

    );
}