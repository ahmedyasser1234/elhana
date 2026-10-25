import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { blogApi } from '../services/api/blogApi';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { Clock, User, ArrowRight } from 'lucide-react';

export const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await blogApi.getAll();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "دليل شرم الشيخ السياحي ومدونة الرحلات | مجموعة الهنا" : "Sharm El Sheikh Travel Guide & Adventure Blog"}
        description={isAr ? "نصائح وإرشادات سياحية مميزة: نصائح رحلات السفاري بالصحراء، أسرار السنوركلينج بمحمية رأس محمد، وأفضل الأنشطة بشرم الشيخ." : "Insider travel guides, tips for quad biking in Sinai desert, Ras Mohammed snorkeling secrets, and Sharm El Sheikh vacation advice."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: t('nav.blog') }]} />

        <SectionTitle
          badge={isAr ? "أسرار ودلائل السفر" : "Insider Travel Secrets"}
          title={isAr ? "دليل شرم الشيخ السياحي الشامل" : "Sharm El Sheikh Destination Guide"}
          subtitle={isAr ? "نصائح وإرشادات وبرامج سياحية برعاية خبراء السفاري والبحر بشركة الهنا." : "Tips, safety advice, and itineraries curated by our local Sinai safari experts."}
        />

        {loading ? (
          <LoadingSkeleton type="card" count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md border border-sky-100 hover:border-[#0284C7] hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-[#38BDF8] px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0284C7]" /> {post.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#0284C7]" /> {post.author}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 font-heading group-hover:text-[#0284C7] transition line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7]">
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 group-hover:translate-x-1 transition">
                      <span>{isAr ? "اقرأ الدليل الكامل" : "Read Guide"}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                    <span className="text-slate-400 text-[10px]">{post.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
