// Social Proof Stats Section
export default function SocialProof() {
    const stats = [
        { value: '15,000+', label: 'Profiles Scored' },
        { value: '4.8/5', label: 'User Rating' },
        { value: '58s', label: 'Avg. Analysis Time' },
        { value: '100%', label: 'Free, No Login' },
    ]

    return (
        <section className="social-proof py-12 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold text-[#0A66C2] mb-1">{stat.value}</div>
                            <div className="text-sm text-[#6B7280]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
