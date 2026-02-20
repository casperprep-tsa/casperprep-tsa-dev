import { BLOG_POSTS, SITE } from "@/lib/constants";
import { Badge, SectionLabel } from "@/components/ui/Primitives";
import { IconInstagram, IconTikTok } from "@/components/Icons";

export const metadata = {
  title: "Blog",
  description: "CASPer insights, strategy breakdowns, and preparation tips from The Success Architect.",
};

export default function BlogPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-display text-[32px] md:text-[34px] font-bold text-white mb-2.5">
            CASPer Insights & Strategy
          </h1>
          <p className="font-body text-[15px] text-white/60">
            Actionable advice and preparation tips from CASPer Prep by TSA.
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[700px] mx-auto">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={i}
              className="bg-white rounded-xl p-7 border border-surface-border mb-4 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Badge variant="orange">{post.tag}</Badge>
                <span className="text-[12px] text-ink-muted font-mono">{post.readTime}</span>
              </div>
              <h2 className="font-display text-[18px] md:text-[19px] font-bold text-ink leading-tight mb-2">
                {post.title}
              </h2>
              <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <span className="text-[12px] text-brand-orange font-semibold font-body">
                {post.date}
              </span>
            </article>
          ))}

          {/* Follow CTA */}
          <div className="mt-10 text-center p-9 bg-white rounded-xl border border-surface-border">
            <h3 className="font-display text-lg font-bold text-ink mb-2">
              Stay in the Loop
            </h3>
            <p className="font-body text-[13px] text-ink-muted mb-5">
              New articles and CASPer strategy content are on the way.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-ink-soft no-underline font-body px-[18px] py-2.5 border border-surface-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <IconInstagram size={16} className="text-ink-soft" /> Instagram
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-ink-soft no-underline font-body px-[18px] py-2.5 border border-surface-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <IconTikTok size={16} className="text-ink-soft" /> TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}