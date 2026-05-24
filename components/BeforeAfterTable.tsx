import React from 'react';

interface Example {
    before: string;
    after: string;
    why: string;
}

interface BeforeAfterTableProps {
    title?: string;
    examples: Example[];
}

export default function BeforeAfterTable({ title = "Before & After Examples", examples }: BeforeAfterTableProps) {
    return (
        <div className="my-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-bold text-[#0A0F1C] m-0">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-3 font-semibold text-gray-500 w-1/3">Weak (Before)</th>
                            <th className="px-6 py-3 font-semibold text-gray-900 w-1/3">Strong (After)</th>
                            <th className="px-6 py-3 font-semibold text-gray-500 w-1/3">Why it works</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {examples.map((ex, i) => (
                            <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 text-gray-500 line-through decoration-red-300 decoration-2 align-top">
                                    {ex.before}
                                </td>
                                <td className="px-6 py-4 text-emerald-700 font-medium align-top">
                                    {ex.after}
                                </td>
                                <td className="px-6 py-4 text-gray-600 align-top text-xs leading-relaxed">
                                    {ex.why}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
