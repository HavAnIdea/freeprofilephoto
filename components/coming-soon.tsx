'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Bell, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComingSoonProps {
  title: string;
  description: string;
  previewImage?: string;
  expectedDate?: string;
  features?: string[];
  color?: string;
}

export default function ComingSoon({
  title,
  description,
  previewImage,
  expectedDate = 'Coming Soon',
  features = [],
  color = 'from-purple-500 to-pink-500'
}: ComingSoonProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
      </div>

      {/* Floating shapes animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${color} opacity-10 blur-3xl`}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${20 * i}%`,
              top: `${15 * i}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6"
            >
              <Badge className={`px-4 py-1 text-sm bg-gradient-to-r ${color} text-white border-0`}>
                <Calendar className="w-4 h-4 mr-1" />
                {expectedDate}
              </Badge>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-8"
            >
              <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${color} p-5`}>
                <Sparkles className="w-full h-full text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {title}
              <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
                is Coming Soon
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>

            {/* Features preview */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <h3 className="text-lg font-semibold mb-4">What to expect:</h3>
                <div className="grid md:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Preview Image */}
            {previewImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-12"
              >
                <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl">
                  <img src={previewImage} alt={`${title} preview`} className="w-full" />
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/funny">
                  Try Our Funny Avatar Generator
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Bell className="w-4 h-4" />
                Get Notified When Ready
              </Button>
            </motion.div>

            {/* Additional message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-muted-foreground mt-8"
            >
              While you wait, explore our currently available features and create amazing avatars!
            </motion.p>
          </motion.div>

          {/* Alternative options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-20 mb-12"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">
              Available Now
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link href="/funny" className="block group">
                <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-xl">😂</span>
                    </div>
                    <h4 className="font-semibold">Funny Avatars</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Create hilarious profile pics with emojis and fun backgrounds</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}