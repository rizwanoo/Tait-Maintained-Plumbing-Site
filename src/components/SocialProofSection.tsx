import React, { useEffect, useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_ASSETS } from '../data/businessData';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Users,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { TouchButton } from './TouchButton';

export const SocialProofSection: React.FC = () => {
  const { config } = useConfig();
  const counterRef = React.useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: '-50px' });
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = 2400;
    const duration = 1800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setFollowerCount(end);
        clearInterval(timer);
      } else {
        setFollowerCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView]);

  const socialPosts = [
    {
      id: 'post-1',
      image: BRAND_ASSETS.image1,
      caption: 'Clean water heater tie-in with expansion tank and proper relief line routing. Making sure domestic hot water is safe and dependable. 💧✨',
      likes: '142',
      tag: '#WaterHeater #PlumbingLife',
    },
    {
      id: 'post-2',
      image: BRAND_ASSETS.image2,
      caption: 'Heating plant distribution manifold routing. Balanced circulation and clean geometry for dependable winter warmth. 🔥🫡',
      likes: '198',
      tag: '#HeatingMaintenance #CleanWork',
    },
    {
      id: 'post-3',
      image: BRAND_ASSETS.image3,
      caption: 'Jobsite diagnostics in action: “Learning everyday, spreading knowledge along the way 🫡” Always take time to do it right the first time.',
      likes: '235',
      tag: '#TaitMaintained #Craftsmanship',
    }
  ];

  return (
    <section id="social" className="py-20 lg:py-28 bg-[#FDFDFE] relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#2A9FE4]" />
            <span>Community & Social Presence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
            Follow the Work
          </h2>

          <p className="text-base sm:text-lg text-[#0d2030]/75 leading-relaxed">
            See real projects, plumbing tips, heating knowledge, jobsite moments, and the latest from Tait Maintained.
          </p>

          {/* Social Stats Pill with Animated Real Counter */}
          <div ref={counterRef} className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-[#0d2030] text-[#FDFDFE] shadow-md">
              <Facebook className="w-4 h-4 text-[#6FC5ED]" />
              <span className="text-xs font-bold font-heading font-mono-code">
                {followerCount >= 1000 ? `${(followerCount / 1000).toFixed(1)}K` : followerCount} followers • 18 following
              </span>
            </div>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2A9FE4] to-[#6FC5ED] text-[#FDFDFE] font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>@taitmaintained on Instagram</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Social Feed Visual Grid with Staggered Hover Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {socialPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: '#2A9FE4' }}
              className="rounded-3xl border border-[#DCE6ED] bg-[#FDFDFE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-[#DCE6ED]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#6FC5ED]">
                    <img
                      src={BRAND_ASSETS.logo}
                      alt="Tait Maintained"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0d2030] font-heading">taitmaintained</p>
                    <p className="text-[10px] text-[#0d2030]/60">Jobsite Update</p>
                  </div>
                </div>
                <Instagram className="w-4 h-4 text-[#2A9FE4]" />
              </div>

              {/* Media */}
              <div className="relative aspect-square overflow-hidden bg-[#0d2030]">
                <img
                  src={post.image}
                  alt="Tait Maintained Jobsite post"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#0d2030]/80 backdrop-blur-md text-[10px] text-[#6FC5ED] font-mono-code font-bold">
                  {post.tag}
                </div>
              </div>

              {/* Caption & Interaction */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[#0d2030]/60 text-xs">
                  <div className="flex items-center gap-1.5 text-[#2A9FE4] font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-[#2A9FE4]" />
                    <span>{post.likes} likes</span>
                  </div>
                  <Share2 className="w-3.5 h-3.5 text-[#0d2030]/40" />
                </div>
                <p className="text-xs text-[#0d2030]/80 line-clamp-3 leading-relaxed">
                  <span className="font-bold text-[#0d2030] mr-1.5">taitmaintained</span>
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Connection CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl bg-[#DCE6ED]/40 border border-[#DCE6ED] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2030]">
              Stay Connected With Our Daily Work
            </h3>
            <p className="text-xs sm:text-sm text-[#0d2030]/75">
              Follow our channels for weekly plumbing education, behind-the-scenes wrench work, and maintenance tips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
            <TouchButton
              href={config.instagramUrl}
              target="_blank"
              variant="dark"
              size="sm"
              icon={<Instagram className="w-4 h-4 text-[#6FC5ED]" />}
            >
              Instagram
            </TouchButton>

            <TouchButton
              href={config.facebookUrl}
              target="_blank"
              variant="primary"
              size="sm"
              icon={<Facebook className="w-4 h-4" />}
            >
              Facebook (2.4K)
            </TouchButton>

            <TouchButton
              href={config.whatsappLink}
              target="_blank"
              variant="secondary"
              size="sm"
              icon={<MessageCircle className="w-4 h-4 text-[#2A9FE4]" />}
            >
              WhatsApp Direct
            </TouchButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
