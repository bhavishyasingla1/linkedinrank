import Link from 'next/link'
import { PROFESSIONS } from '@/lib/professionsData'

interface DynamicRelatedProfessionsProps {
    currentSlug: string;
}

export default function DynamicRelatedProfessions({ currentSlug }: DynamicRelatedProfessionsProps) {
    // Find related professions by excluding current and grabbing a few
    const related = PROFESSIONS.filter(p => p.slug !== currentSlug).slice(0, 6);

    if (related.length === 0) return null;

    return (
        <section className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-xl font-bold text-[#0A0F1C] mb-6">Explore Headlines for Other Roles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {related.map(profession => (
                        <Link 
                            key={profession.slug} 
                            href={`/linkedin-headline-for-${profession.slug}`}
                            className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 hover:border-[#0A66C2] hover:shadow-sm transition-all group"
                        >
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-[#0A0F1C] group-hover:text-[#0A66C2] transition-colors truncate block">
                                    {profession.name}
                                </span>
                                <span className="text-[11px] text-[#6B7280] mt-0.5 truncate block">
                                    {profession.industry}
                                </span>
                            </div>
                            <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#0A66C2] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
