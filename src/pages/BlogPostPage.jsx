import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { blogApi } from '../services/api/blogApi';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { Clock, User, Calendar, Compass } from 'lucide-react';
import { Button } from '../components/common/Button';

export const BlogPostPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await blogApi.getBySlug(slug);
      setPost(res.data);
    } catch (err) {
      setError("Failed to load article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-28 pb-20 max-w-4xl mx-auto px-4"><LoadingSkeleton type="card" count={1} /></div>;
  if (error || !post) return <div className="pt-28 pb-20 max-w-4xl mx-auto px-4"><ErrorState onRetry={fetchPost} /></div>;

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead title={post.title} description={post.excerpt} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Breadcrumbs items={[{ label: t('nav.blog'), link: '/blog' }, { label: post.title }]} />

        {/* Title Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
            <span className="px-3 py-1 bg-sky-100 text-[#0284C7] rounded-full uppercase tracking-wider">{post.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0284C7]" /> {post.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#0284C7]" /> {post.publishedAt}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <User className="w-4 h-4 text-[#0284C7]" />
            <span>{isAr ? "بقلم " : "Written by "}<strong className="text-slate-900">{post.author}</strong></span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[16/9] min-h-[360px] sm:min-h-[440px] md:min-h-[480px] rounded-3xl overflow-hidden shadow-xl border border-sky-100">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover object-center" />
        </div>

        {/* Article Body */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-sky-100 shadow-md space-y-6 text-slate-800 leading-relaxed font-sans text-base">
          <p className="text-lg font-medium text-slate-900 border-l-4 border-[#0284C7] rtl:border-r-4 rtl:border-l-0 pl-4 rtl:pr-4 italic bg-sky-50/60 py-3 rounded-r-xl">
            {post.excerpt}
          </p>

          <div className="prose max-w-none text-sm md:text-base space-y-4 font-normal">
            <p>
              {isAr
                ? "تتميز شرم الشيخ عالمياً بمياهها الفيروزية الكريستالية وجبال سيناء الجرانيتية المهيبة. سواء كنت تخطط لرحلتك الأولى أو تعود لمغامرة جديدة، فإن معرفة النصائح الصحيحة تجعل عطلتك استثنائية."
                : "Sharm El Sheikh is renowned worldwide for its crystal-clear turquoise waters and majestic granite mountains of the Sinai peninsula. Whether you are planning your first trip or returning for another adventure, knowing what to expect makes all the difference."}
            </p>
            <h3 className="text-xl font-bold font-heading text-slate-900 pt-4">
              {isAr ? "نصائح هامة قبل التخطيط" : "Essential Planning Tips"}
            </h3>
            <p>
              {isAr
                ? "احرص دائماً على حجز رحلات السفاري بالبيتش باجي والرحلات البحرية مع مشغل محلي مرخص يضمن لك التوصيل المجاني من وإلى الفندق. ارتدِ أحذية مغلقة أثناء السفاري واستخدم واقي الشمس لضمان راحتك وأمانك."
                : "Always make sure to book your desert quad safaris and sea trips with a licensed local operator that provides complimentary hotel lobby pickup. Wearing proper footwear like closed sneakers for quad biking and bringing reef-safe sunscreen ensures maximum comfort."}
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-sky-400/30 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl font-bold font-heading text-white">{isAr ? "هل أنت جاهز لتجربة شرم الشيخ؟" : "Ready to Experience Sharm?"}</h3>
          <p className="text-xs text-slate-300 font-normal">{isAr ? "استكشف كتالوج رحلاتنا الكامل من البيتش باجي، الكار باجي، ويخوت الـ VIP." : "Explore our full catalog of quad safaris, dune buggies, and VIP yacht cruises."}</p>
          <Link to="/experiences">
            <Button variant="primary" size="md" icon={Compass}>
              {t('experiences.exploreAll')}
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogPostPage;
