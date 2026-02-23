'use client'

import HeadlineGeneratorTool from '@/components/tools/HeadlineGenerator'
import AboutGeneratorTool from '@/components/tools/AboutGenerator'
import BulletImproverV2 from '@/components/tools/BulletImproverV2'
import ProfileRingCreator from '@/components/tools/ProfileRingCreator'
import SEOCheckerTool from '@/components/tools/SEOChecker'
import PostIdeaGenerator from '@/components/tools/PostIdeaGenerator'
import StoryToPost from '@/components/tools/StoryToPost'
import PostHookGeneratorTool from '@/components/tools/PostHookGenerator'
import ContentPillarPlanner from '@/components/tools/ContentPillarPlanner'
import CommentGenerator from '@/components/tools/CommentGenerator'
import ConnectionMessageGenerator from '@/components/tools/ConnectionMessageGenerator'
import QRCodeGeneratorTool from '@/components/tools/QRCodeGenerator'

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    headline: HeadlineGeneratorTool,
    about: AboutGeneratorTool,
    bullets: BulletImproverV2,
    ring: ProfileRingCreator,
    seo: SEOCheckerTool,
    postideas: PostIdeaGenerator,
    storytopost: StoryToPost,
    hooks: PostHookGeneratorTool,
    pillars: ContentPillarPlanner,
    comments: CommentGenerator,
    messages: ConnectionMessageGenerator,
    qrcode: QRCodeGeneratorTool,
}

export default function ToolPageClient({ toolId }: { toolId: string }) {
    const Component = TOOL_COMPONENTS[toolId]
    if (!Component) return <p className="text-sm text-red-500">Tool not found</p>
    return <Component />
}
