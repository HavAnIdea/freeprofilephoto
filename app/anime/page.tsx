'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, Download, Share2, Shuffle, ArrowLeft,
  Wand2, Star, Heart, Smile, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarGenerator, AnimeAvatarOptions } from '@/lib/avatar-generator';

const hairStyles = [
  { id: 'short', name: 'Short', emoji: '✂️', description: 'Spiky & energetic' },
  { id: 'long', name: 'Long', emoji: '👱', description: 'Flowing & elegant' },
  { id: 'twintails', name: 'Twin Tails', emoji: '🎀', description: 'Cute & playful' },
  { id: 'ponytail', name: 'Ponytail', emoji: '💫', description: 'Athletic & cool' },
  { id: 'bob', name: 'Bob Cut', emoji: '💇', description: 'Classic & chic' },
];

const hairColors = [
  { id: 'black', color: '#2c1810', name: 'Black' },
  { id: 'brown', color: '#8b4513', name: 'Brown' },
  { id: 'blonde', color: '#ffd700', name: 'Blonde' },
  { id: 'pink', color: '#ff69b4', name: 'Pink' },
  { id: 'blue', color: '#4169e1', name: 'Blue' },
  { id: 'purple', color: '#9370db', name: 'Purple' },
  { id: 'red', color: '#dc143c', name: 'Red' },
  { id: 'silver', color: '#c0c0c0', name: 'Silver' },
];

const eyeStyles = [
  { id: 'sparkle', name: 'Sparkle', emoji: '✨', description: 'Big & shiny' },
  { id: 'normal', name: 'Normal', emoji: '👁️', description: 'Classic anime' },
  { id: 'closed', name: 'Closed', emoji: '😊', description: 'Happy & content' },
  { id: 'happy', name: 'Happy', emoji: '^_^', description: 'Cheerful smile' },
];

const expressions = [
  { id: 'smile', name: 'Smile', emoji: '😄', description: 'Big happy smile' },
  { id: 'neutral', name: 'Neutral', emoji: '😐', description: 'Calm expression' },
  { id: 'shy', name: 'Shy', emoji: '😊', description: 'Blushing & cute' },
  { id: 'wink', name: 'Wink', emoji: '😉', description: 'Playful wink' },
];

const accessories = [
  { id: 'glasses', name: 'Glasses', emoji: '👓' },
  { id: 'bow', name: 'Bow', emoji: '🎀' },
  { id: 'headband', name: 'Headband', emoji: '👑' },
  { id: 'earring', name: 'Earrings', emoji: '💎' },
];

const backgroundEffects = [
  { id: 'none', name: 'None', emoji: '⬜' },
  { id: 'stars', name: 'Stars', emoji: '⭐' },
  { id: 'sparkles', name: 'Sparkles', emoji: '✨' },
  { id: 'gradient', name: 'Gradient', emoji: '🌈' },
];

const backgroundColors = [
  { id: 'pink', color: '#fff5f7', name: 'Soft Pink' },
  { id: 'blue', color: '#e3f2fd', name: 'Sky Blue' },
  { id: 'purple', color: '#f3e5f5', name: 'Lavender' },
  { id: 'yellow', color: '#fffde7', name: 'Cream' },
  { id: 'mint', color: '#e0f2f1', name: 'Mint' },
];

export default function AnimeGeneratorPage() {
  const [options, setOptions] = useState<AnimeAvatarOptions>({
    hairStyle: 'long',
    hairColor: '#ffd700',
    eyeStyle: 'sparkle',
    expression: 'smile',
    accessories: [],
    backgroundColor: '#fff5f7',
    backgroundEffect: 'sparkles',
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
      const result = generatorRef.current!.generateAnime(options);
      setPreview(result);
      setIsGenerating(false);
    }, 100);
  };

  const randomize = () => {
    const randomHairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    const randomHairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const randomEyeStyle = eyeStyles[Math.floor(Math.random() * eyeStyles.length)];
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    const randomBgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const randomBgEffect = backgroundEffects[Math.floor(Math.random() * backgroundEffects.length)];

    // Randomly select 0-2 accessories
    const numAccessories = Math.floor(Math.random() * 3);
    const shuffled = [...accessories].sort(() => 0.5 - Math.random());
    const randomAccessories = shuffled.slice(0, numAccessories).map(a => a.id);

    setOptions({
      hairStyle: randomHairStyle.id as 'short' | 'long' | 'twintails' | 'ponytail' | 'bob',
      hairColor: randomHairColor.color,
      eyeStyle: randomEyeStyle.id as 'sparkle' | 'normal' | 'closed' | 'happy',
      expression: randomExpression.id as 'smile' | 'neutral' | 'shy' | 'wink',
      accessories: randomAccessories,
      backgroundColor: randomBgColor.color,
      backgroundEffect: randomBgEffect.id as 'stars' | 'sparkles' | 'gradient' | 'none',
    });
  };

  const downloadImage = () => {
    if (!generatorRef.current) return;
    generatorRef.current.downloadImage('anime-avatar.png');
  };

  const shareImage = async () => {
    if (!generatorRef.current) return;

    try {
      const blob = await generatorRef.current.exportAsBlob('png');
      const file = new File([blob], 'anime-avatar.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Anime Avatar',
          text: 'Check out my anime-style profile picture!',
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

  const toggleAccessory = (accessoryId: string) => {
    setOptions(prev => {
      const current = prev.accessories || [];
      if (current.includes(accessoryId)) {
        return { ...prev, accessories: current.filter(a => a !== accessoryId) };
      } else {
        return { ...prev, accessories: [...current, accessoryId] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        {/* Floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-pink-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="text-pink-600 hover:text-pink-700" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Anime Avatar Creator
            </span>
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
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Anime</span> Avatar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Design your perfect anime-style character with customizable hair, eyes, expressions, and accessories!
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
            <Star className="w-4 h-4 mr-1" />
            100% Free • No Watermarks • Unlimited Downloads
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
            <Card className="p-4 bg-white/80 backdrop-blur-xl border-pink-200 shadow-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-pink-700">
                <Zap className="w-4 h-4" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={randomize}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Randomize Character
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Avatar
                </Button>
              </div>
            </Card>

            {/* Customization Tabs */}
            <Card className="p-6 bg-white/80 backdrop-blur-xl border-pink-200 shadow-xl">
              <Tabs defaultValue="hair" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-pink-100">
                  <TabsTrigger value="hair" className="data-[state=active]:bg-white">Hair</TabsTrigger>
                  <TabsTrigger value="face" className="data-[state=active]:bg-white">Face</TabsTrigger>
                  <TabsTrigger value="extras" className="data-[state=active]:bg-white">Extras</TabsTrigger>
                </TabsList>

                {/* Hair Tab */}
                <TabsContent value="hair" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Hair Style</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hairStyles.map((style) => (
                        <motion.button
                          key={style.id}
                          onClick={() => setOptions({ ...options, hairStyle: style.id as 'short' | 'long' | 'twintails' | 'ponytail' | 'bob' })}
                          className={`
                            p-3 rounded-lg text-left transition-all
                            ${options.hairStyle === style.id
                              ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white scale-105 shadow-lg'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-2xl mb-1">{style.emoji}</div>
                          <div className="text-xs font-medium">{style.name}</div>
                          <div className="text-xs opacity-80">{style.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Hair Color</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {hairColors.map((color) => (
                        <motion.button
                          key={color.id}
                          onClick={() => setOptions({ ...options, hairColor: color.color })}
                          className={`
                            aspect-square rounded-lg border-2 transition-all
                            ${options.hairColor === color.color
                              ? 'border-pink-500 scale-110 shadow-lg'
                              : 'border-gray-300 hover:scale-105'
                            }
                          `}
                          style={{ backgroundColor: color.color }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Face Tab */}
                <TabsContent value="face" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Eye Style</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {eyeStyles.map((style) => (
                        <motion.button
                          key={style.id}
                          onClick={() => setOptions({ ...options, eyeStyle: style.id as 'sparkle' | 'normal' | 'closed' | 'happy' })}
                          className={`
                            p-3 rounded-lg text-left transition-all
                            ${options.eyeStyle === style.id
                              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-105'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-xl mb-1">{style.emoji}</div>
                          <div className="text-xs font-medium">{style.name}</div>
                          <div className="text-xs opacity-80">{style.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Expression</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {expressions.map((expr) => (
                        <motion.button
                          key={expr.id}
                          onClick={() => setOptions({ ...options, expression: expr.id as 'smile' | 'neutral' | 'shy' | 'wink' })}
                          className={`
                            p-3 rounded-lg text-left transition-all
                            ${options.expression === expr.id
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white scale-105'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-xl mb-1">{expr.emoji}</div>
                          <div className="text-xs font-medium">{expr.name}</div>
                          <div className="text-xs opacity-80">{expr.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Extras Tab */}
                <TabsContent value="extras" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Accessories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {accessories.map((acc) => (
                        <motion.button
                          key={acc.id}
                          onClick={() => toggleAccessory(acc.id)}
                          className={`
                            p-3 rounded-lg text-center transition-all
                            ${(options.accessories || []).includes(acc.id)
                              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-105'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-2xl mb-1">{acc.emoji}</div>
                          <div className="text-xs font-medium">{acc.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Background Color</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {backgroundColors.map((bg) => (
                        <motion.button
                          key={bg.id}
                          onClick={() => setOptions({ ...options, backgroundColor: bg.color })}
                          className={`
                            aspect-square rounded-lg border-2 transition-all
                            ${options.backgroundColor === bg.color
                              ? 'border-purple-500 scale-110 shadow-lg'
                              : 'border-gray-300 hover:scale-105'
                            }
                          `}
                          style={{ backgroundColor: bg.color }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title={bg.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Background Effect</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {backgroundEffects.map((effect) => (
                        <motion.button
                          key={effect.id}
                          onClick={() => setOptions({ ...options, backgroundEffect: effect.id as 'stars' | 'sparkles' | 'gradient' | 'none' })}
                          className={`
                            p-2 rounded-lg text-center transition-all
                            ${options.backgroundEffect === effect.id
                              ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white scale-105'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-xl mb-1">{effect.emoji}</div>
                          <div className="text-xs font-medium">{effect.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-xl border-pink-200 shadow-xl">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  Your Anime Character
                </h3>

                {/* Avatar Preview */}
                <motion.div
                  className="relative mb-8"
                  animate={isGenerating ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200">
                    {preview ? (
                      <motion.img
                        src={preview}
                        alt="Anime Avatar Preview"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                        <Wand2 className="w-16 h-16 text-pink-400" />
                      </div>
                    )}
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -left-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="bg-pink-500 text-white border-0 shadow-lg">
                      <Heart className="w-3 h-3 mr-1" />
                      Kawaii
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -right-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Badge className="bg-purple-500 text-white border-0 shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Anime Style
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  <Button
                    size="lg"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-8"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="lg"
                    onClick={shareImage}
                    variant="outline"
                    className="border-pink-300 text-pink-700 hover:bg-pink-50 px-8"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button
                    size="lg"
                    onClick={randomize}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    Random
                  </Button>
                </div>

                {/* Tips */}
                <div className="w-full max-w-lg p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200">
                  <p className="text-sm text-gray-700 text-center">
                    💡 <strong>Pro Tip:</strong> Mix different hair styles with unique colors to create
                    your one-of-a-kind anime character! Don&apos;t forget to add accessories for extra flair.
                  </p>
                </div>
              </div>
            </Card>

            {/* Try Other Styles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 bg-white/80 backdrop-blur-xl border-pink-200 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Try Other Avatar Styles
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    <Link href="/funny">
                      <Smile className="w-4 h-4 mr-2" />
                      Funny Style
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                    <Link href="/cute">
                      <Heart className="w-4 h-4 mr-2" />
                      Cute Animals
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    <Link href="/cool">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Cool & Modern
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
