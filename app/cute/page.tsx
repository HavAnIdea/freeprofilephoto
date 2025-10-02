'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart, Download, Share2, Shuffle, ArrowLeft,
  Sparkles, Star, Rainbow, Cherry,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarGenerator, CuteAvatarOptions } from '@/lib/avatar-generator';

const animals = [
  { id: 'cat', emoji: '🐱', name: 'Cat' },
  { id: 'bear', emoji: '🐻', name: 'Bear' },
  { id: 'bunny', emoji: '🐰', name: 'Bunny' },
  { id: 'panda', emoji: '🐼', name: 'Panda' },
  { id: 'fox', emoji: '🦊', name: 'Fox' },
];

const eyes = [
  { id: 'happy', emoji: '😊', name: 'Happy' },
  { id: 'wink', emoji: '😉', name: 'Wink' },
  { id: 'sleepy', emoji: '😴', name: 'Sleepy' },
  { id: 'sparkle', emoji: '✨', name: 'Sparkle' },
  { id: 'hearts', emoji: '😍', name: 'Hearts' },
];

const cuteAccessories = [
  { emoji: '🎀', label: 'Bow' },
  { emoji: '🌸', label: 'Flower' },
  { emoji: '🌟', label: 'Star' },
  { emoji: '💖', label: 'Heart' },
  { emoji: '🌈', label: 'Rainbow' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🌺', label: 'Hibiscus' },
  { emoji: '👑', label: 'Crown' },
];

const backgroundColors = [
  { id: 'pink', name: 'Cotton Candy', color: '#ffebf0' },
  { id: 'purple', name: 'Lavender', color: '#f0ebff' },
  { id: 'blue', name: 'Sky Blue', color: '#ebf5ff' },
  { id: 'yellow', name: 'Sunshine', color: '#fff9eb' },
  { id: 'mint', name: 'Mint', color: '#ebfff5' },
  { id: 'peach', name: 'Peach', color: '#ffebe6' },
];

export default function CuteGeneratorPage() {
  const [options, setOptions] = useState<CuteAvatarOptions>({
    animal: 'cat',
    eyes: 'happy',
    cheeks: true,
    accessories: [],
    backgroundColor: '#ffebf0',
  });

  const [preview, setPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const generatorRef = useRef<AvatarGenerator | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      generatorRef.current = new AvatarGenerator(400);
    }
  }, []);

  useEffect(() => {
    generatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const generatePreview = () => {
    if (!generatorRef.current) return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = generatorRef.current!.generateCute(options);
      setPreview(result);
      setIsGenerating(false);
    }, 100);
  };

  const randomize = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomEyes = eyes[Math.floor(Math.random() * eyes.length)];
    const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const randomAccessories = cuteAccessories
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .map(a => a.emoji);

    setOptions({
      animal: randomAnimal.id as 'cat' | 'bear' | 'bunny' | 'panda' | 'fox',
      eyes: randomEyes.id,
      cheeks: Math.random() > 0.3,
      accessories: randomAccessories,
      backgroundColor: randomBg.color,
    });
  };

  const downloadImage = () => {
    if (!generatorRef.current) return;
    generatorRef.current.downloadImage('cute-avatar.png');
  };

  const shareImage = async () => {
    if (!generatorRef.current) return;

    try {
      const blob = await generatorRef.current.exportAsBlob('png');
      const file = new File([blob], 'cute-avatar.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Cute Avatar',
          text: 'Check out my kawaii profile picture created with FreeProfilePhoto!',
        });
      } else {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pink-200"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 0
            }}
            animate={{
              y: -100,
              x: Math.sin(i) * 100
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}

        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Star className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">Cute Avatar Maker</span>
          </div>

          <div className="w-24" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">Kawaii</span> Avatar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose adorable animals, customize their expressions, and add cute accessories
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            100% Free • No Watermarks • Pure Cuteness
          </Badge>
        </motion.div>

        {/* Generator Layout */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Actions */}
            <Card className="p-4 backdrop-blur-xl bg-white/70 border-pink-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={randomize}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random Kawaii
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Customization Tabs */}
            <Card className="p-6 backdrop-blur-xl bg-white/70 border-pink-200">
              <Tabs defaultValue="animal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="animal">Animal</TabsTrigger>
                  <TabsTrigger value="expression">Face</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                {/* Animal Selection */}
                <TabsContent value="animal" className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Choose Your Animal</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {animals.map((animal) => (
                      <motion.button
                        key={animal.id}
                        onClick={() => setOptions({ ...options, animal: animal.id as 'cat' | 'bear' | 'bunny' | 'panda' | 'fox' })}
                        className={`
                          aspect-square rounded-xl flex flex-col items-center justify-center
                          transition-all cursor-pointer
                          ${options.animal === animal.id
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-pink-50 border-2 border-pink-100'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl mb-1">{animal.emoji}</span>
                        <span className="text-xs font-medium">{animal.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>

                {/* Expression Selection */}
                <TabsContent value="expression" className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Expression</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {eyes.map((eye) => (
                      <motion.button
                        key={eye.id}
                        onClick={() => setOptions({ ...options, eyes: eye.id })}
                        className={`
                          aspect-square rounded-xl flex flex-col items-center justify-center
                          transition-all cursor-pointer
                          ${options.eyes === eye.id
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                            : 'bg-white hover:bg-pink-50 border-2 border-pink-100'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl mb-1">{eye.emoji}</span>
                        <span className="text-xs font-medium">{eye.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Cheeks Toggle */}
                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options.cheeks}
                        onChange={(e) => setOptions({ ...options, cheeks: e.target.checked })}
                        className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm font-medium">Add Blush 🌸</span>
                    </label>
                  </div>
                </TabsContent>

                {/* Style Tab */}
                <TabsContent value="style" className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Background Color</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {backgroundColors.map((bg) => (
                      <motion.button
                        key={bg.id}
                        onClick={() => setOptions({ ...options, backgroundColor: bg.color })}
                        className={`
                          h-20 rounded-xl overflow-hidden relative
                          transition-all cursor-pointer border-2
                          ${options.backgroundColor === bg.color
                            ? 'ring-4 ring-pink-500 scale-105 border-pink-500'
                            : 'border-gray-200 hover:scale-105'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: bg.color }}
                        />
                        <div className="absolute inset-0 flex items-end p-2">
                          <span className="text-xs font-medium text-gray-700">{bg.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Accessories */}
                  <h4 className="text-sm font-medium text-muted-foreground mt-4">
                    Accessories (Max 3)
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {cuteAccessories.map((item) => {
                      const isSelected = options.accessories?.includes(item.emoji);
                      return (
                        <motion.button
                          key={item.emoji}
                          onClick={() => {
                            const current = options.accessories || [];
                            if (isSelected) {
                              setOptions({
                                ...options,
                                accessories: current.filter(a => a !== item.emoji),
                              });
                            } else if (current.length < 3) {
                              setOptions({
                                ...options,
                                accessories: [...current, item.emoji],
                              });
                            }
                          }}
                          className={`
                            aspect-square rounded-lg flex flex-col items-center justify-center text-sm
                            transition-all cursor-pointer
                            ${isSelected
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white scale-105'
                              : 'bg-white hover:bg-pink-50 border border-pink-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">{item.emoji}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Center Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 backdrop-blur-xl bg-white/70 border-pink-200 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Heart className="w-6 h-6 text-pink-300" />
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6">Preview</h3>

                {/* Avatar Preview */}
                <motion.div
                  className="relative"
                  animate={isGenerating ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white">
                    {preview ? (
                      <motion.img
                        src={preview}
                        alt="Cute Avatar Preview"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <Heart className="w-16 h-16 text-pink-300" />
                      </div>
                    )}

                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <RefreshCw className="w-12 h-12 text-pink-500" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -left-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="bg-pink-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Kawaii!
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -right-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Badge className="bg-purple-500 text-white">
                      100% Cute
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    size="lg"
                    onClick={shareImage}
                    variant="outline"
                    className="border-pink-200 hover:bg-pink-50 px-8"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button
                    size="lg"
                    onClick={randomize}
                    variant="outline"
                    className="border-pink-200 hover:bg-pink-50 px-8"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    Random
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-8 p-4 rounded-xl bg-pink-50 max-w-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    💖 <strong>Tip:</strong> Try different animal and accessory combinations
                    to create your perfect kawaii avatar!
                  </p>
                </div>
              </div>
            </Card>

            {/* Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 backdrop-blur-xl bg-white/70 border-pink-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Rainbow className="w-5 h-5 text-pink-500" />
                  Quick Presets
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { animal: 'cat', eyes: 'hearts', accessories: ['🎀'] },
                    { animal: 'bunny', eyes: 'sparkle', accessories: ['🌸'] },
                    { animal: 'panda', eyes: 'sleepy', accessories: ['🌟'] },
                    { animal: 'bear', eyes: 'happy', accessories: ['💖'] },
                    { animal: 'fox', eyes: 'wink', accessories: ['🦋'] },
                  ].map((preset, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        setOptions({
                          ...options,
                          animal: preset.animal as 'cat' | 'bear' | 'bunny' | 'panda' | 'fox',
                          eyes: preset.eyes,
                          accessories: preset.accessories,
                          cheeks: true,
                        });
                      }}
                      className="aspect-square rounded-xl bg-white hover:bg-pink-50 border-2 border-pink-100 flex items-center justify-center text-2xl cursor-pointer transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {animals.find(a => a.id === preset.animal)?.emoji}
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 backdrop-blur-xl bg-white/70 border-pink-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Love Your Kawaii Avatar?</h3>
            <p className="text-muted-foreground mb-4">
              Try our other styles too! Create funny emojis, cool designs, and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline" className="border-pink-200 hover:bg-pink-50">
                <Link href="/funny">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Funny Style
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-pink-200 hover:bg-pink-50">
                <Link href="/cool">
                  <Cherry className="w-4 h-4 mr-2" />
                  Try Cool Style
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
