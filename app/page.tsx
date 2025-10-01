'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Heart, Smile, Cat, Palette, Wand2, Download, ArrowRight, Star, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState, useCallback } from 'react';
import { AvatarGenerator } from '@/lib/avatar-generator';

const features = [
  {
    icon: Smile,
    title: 'Funny Avatars',
    description: 'Create hilarious profile pics with emojis and fun backgrounds',
    color: 'from-purple-500 to-pink-500',
    href: '/funny',
    badge: 'Popular',
  },
  {
    icon: Heart,
    title: 'Cute Animals',
    description: 'Adorable cats, bears, bunnies, and more kawaii creatures',
    color: 'from-pink-500 to-rose-500',
    href: '/cute',
    badge: 'Most Loved',
  },
  {
    icon: Palette,
    title: 'Cool & Stylish',
    description: 'Modern gradients and geometric designs',
    color: 'from-cyan-500 to-purple-500',
    href: '/cool',
    badge: 'New',
  },
  {
    icon: Cat,
    title: 'Anime Style',
    description: 'Create your perfect anime-inspired avatar',
    color: 'from-blue-500 to-cyan-500',
    href: '/anime',
    badge: 'Coming Soon',
  },
];

const stats = [
  { label: 'Free Forever', value: '100%' },
  { label: 'No Sign-up', value: 'Required' },
  { label: 'No Watermarks', value: '✓' },
  { label: 'Downloads', value: '∞' },
];

const benefits = [
  { icon: CheckCircle, text: 'No watermarks or logos' },
  { icon: CheckCircle, text: 'High quality PNG downloads' },
  { icon: CheckCircle, text: 'Unlimited customization' },
  { icon: CheckCircle, text: 'No account required' },
  { icon: CheckCircle, text: 'Works on all devices' },
  { icon: CheckCircle, text: 'Instant generation' },
];

export default function HomePage() {
  const [showcaseAvatars, setShowcaseAvatars] = useState<string[]>([]);
  const generatorRef = useRef<AvatarGenerator | null>(null);

  const generateShowcaseAvatars = useCallback(() => {
    if (!generatorRef.current) return;

    const avatars = [
      // Funny avatars
      generatorRef.current.generateFunny({
        face: '😂',
        accessories: ['🎉', '⭐'],
        background: 'gradient-1',
      }),
      generatorRef.current.generateFunny({
        face: '😎',
        accessories: ['🔥'],
        background: 'gradient-2',
      }),
      // Cute avatars
      generatorRef.current.generateCute({
        animal: 'cat',
        eyes: 'kawaii',
        cheeks: true,
        backgroundColor: '#ffebf0',
      }),
      generatorRef.current.generateCute({
        animal: 'panda',
        eyes: 'sparkle',
        cheeks: true,
        backgroundColor: '#e0f7fa',
      }),
      // Cool avatars
      generatorRef.current.generateCool({
        colorScheme: ['#FF0080', '#7928CA', '#FF0080'],
        shape: 'circle',
        gradientType: 'linear',
        glow: true,
      }),
      generatorRef.current.generateCool({
        colorScheme: ['#667eea', '#764ba2', '#f093fb'],
        shape: 'hexagon',
        gradientType: 'radial',
        glow: true,
      }),
      generatorRef.current.generateCute({
        animal: 'fox',
        eyes: 'sparkle',
        cheeks: true,
        backgroundColor: '#fff3e0',
      }),
      generatorRef.current.generateCool({
        colorScheme: ['#11998e', '#38ef7d'],
        shape: 'square',
        gradientType: 'linear',
        glow: false,
      }),
    ];

    setShowcaseAvatars(avatars);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      generatorRef.current = new AvatarGenerator(200);
      generateShowcaseAvatars();
    }
  }, [generateShowcaseAvatars]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
      </div>

      {/* Floating shapes animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[
          { left: '10%', top: '20%' },
          { left: '80%', top: '10%' },
          { left: '20%', top: '60%' },
          { left: '70%', top: '70%' },
          { left: '50%', top: '30%' },
          { left: '40%', top: '80%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blur-3xl"
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
              left: pos.left,
              top: pos.top,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">FreeProfilePhoto</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/funny">
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <Badge className="px-4 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Star className="w-4 h-4 mr-1" />
              Completely Free - No Watermarks
            </Badge>
          </motion.div>

          {/* Main heading with gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Create Amazing
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500">Profile Pictures</span>
            <br />
            in Seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Generate funny, cute, and stylish avatars instantly. No sign-up required, no watermarks.
            Create and download unlimited times - 100% free forever!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:shadow-2xl transition-transform duration-300 hover:scale-105 text-lg px-8 py-6 w-full sm:w-auto"
              asChild
            >
              <Link href="/funny">
                <Smile className="w-5 h-5 mr-2" />
                Create Funny Avatar
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white transition-all duration-300 hover:shadow-2xl transition-transform duration-300 hover:scale-105 text-lg px-8 py-6 w-full sm:w-auto"
              asChild
            >
              <Link href="/cute">
                <Heart className="w-5 h-5 mr-2" />
                Make Cute Profile Pic
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Real Avatar Showcase Gallery */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
            <TrendingUp className="w-4 h-4 mr-1" />
            Live Examples
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See What You Can <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Create</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real examples generated by our avatar creator. Click on any style below to start making your own!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {showcaseAvatars.map((avatar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`Avatar example ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 animate-pulse" />
                )}

                {/* Hover overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                  <div className="text-center">
                    <span className="text-white text-sm font-semibold block mb-1">
                      {i < 2 ? '😂 Funny Style' : i < 5 ? '🐱 Cute Style' : '✨ Cool Style'}
                    </span>
                    <span className="text-white/80 text-xs">
                      Click to create
                    </span>
                  </div>
                </div>

                {/* Badge tag */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-white/90 text-gray-900 border-0 backdrop-blur-sm text-xs">
                    {i < 2 ? 'Funny' : i < 5 ? 'Cute' : 'Cool'}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white transition-all hover:shadow-xl"
            asChild
          >
            <Link href="/funny">
              <Zap className="w-5 h-5 mr-2" />
              Create Your Own Now
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Style</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pick from our collection of avatar styles, all generated instantly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="block group"
                >
                  <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                    {/* Badge */}
                    {feature.badge && (
                      <Badge className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 shadow-lg">
                        {feature.badge}
                      </Badge>
                    )}

                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>

                    {/* Hover arrow */}
                    <ArrowRight className="w-5 h-5 mt-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section - New */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-12 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">FreeProfilePhoto?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-lg">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your perfect avatar in 3 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Palette,
              title: '1. Choose Style',
              description: 'Pick from funny, cute, anime, or cool avatar styles',
            },
            {
              icon: Wand2,
              title: '2. Customize',
              description: 'Select colors, accessories, and expressions',
            },
            {
              icon: Download,
              title: '3. Download',
              description: 'Get your avatar instantly in high quality PNG',
            },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-10 h-10" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl p-12 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Create Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500">Perfect Avatar?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users creating amazing profile pictures every day.
            No credit card, no sign-up, just pure creativity!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-12 py-6 transition-all duration-300 hover:shadow-2xl"
              asChild
            >
              <Link href="/funny">
                Start Creating Now
                <Sparkles className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 FreeProfilePhoto. Made with ❤️ for creative people.
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
