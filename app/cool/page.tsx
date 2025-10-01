'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Palette, Download, Share2, Shuffle, ArrowLeft,
  Sparkles, Zap, RefreshCw, Heart, Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarGenerator, CoolAvatarOptions } from '@/lib/avatar-generator';

const colorSchemes = [
  {
    id: 'neon',
    name: 'Neon Dreams',
    colors: ['#FF0080', '#7928CA', '#FF0080'],
    preview: 'linear-gradient(135deg, #FF0080, #7928CA)'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    preview: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: ['#ff6e7f', '#bfe9ff', '#ff6e7f'],
    preview: 'linear-gradient(135deg, #ff6e7f, #bfe9ff)'
  },
  {
    id: 'forest',
    name: 'Forest Mist',
    colors: ['#11998e', '#38ef7d'],
    preview: 'linear-gradient(135deg, #11998e, #38ef7d)'
  },
  {
    id: 'fire',
    name: 'Fire Blaze',
    colors: ['#f12711', '#f5af19'],
    preview: 'linear-gradient(135deg, #f12711, #f5af19)'
  },
  {
    id: 'purple',
    name: 'Purple Haze',
    colors: ['#8E2DE2', '#4A00E0'],
    preview: 'linear-gradient(135deg, #8E2DE2, #4A00E0)'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    colors: ['#00d2ff', '#3a7bd5'],
    preview: 'linear-gradient(135deg, #00d2ff, #3a7bd5)'
  },
  {
    id: 'gold',
    name: 'Golden Hour',
    colors: ['#FFD700', '#FF8C00', '#FFD700'],
    preview: 'linear-gradient(135deg, #FFD700, #FF8C00)'
  },
];

const shapes = [
  { id: 'circle', name: 'Circle', emoji: '⚫' },
  { id: 'square', name: 'Square', emoji: '⬛' },
  { id: 'hexagon', name: 'Hexagon', emoji: '⬢' },
  { id: 'triangle', name: 'Triangle', emoji: '▲' },
];

const patterns = [
  { id: 'none', name: 'None', emoji: '∅' },
  { id: 'dots', name: 'Dots', emoji: '⋯' },
  { id: 'grid', name: 'Grid', emoji: '⊞' },
  { id: 'waves', name: 'Waves', emoji: '〰' },
  { id: 'geometric', name: 'Geometric', emoji: '◆' },
];

const gradientTypes = [
  { id: 'linear', name: 'Linear', emoji: '↗' },
  { id: 'radial', name: 'Radial', emoji: '◉' },
  { id: 'conic', name: 'Conic', emoji: '⊚' },
];

export default function CoolGeneratorPage() {
  const [options, setOptions] = useState<CoolAvatarOptions>({
    colorScheme: ['#FF0080', '#7928CA', '#FF0080'],
    shape: 'circle',
    pattern: 'none',
    gradientType: 'linear',
    glow: true,
    text: '',
    textColor: '#ffffff',
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
      const result = generatorRef.current!.generateCool(options);
      setPreview(result);
      setIsGenerating(false);
    }, 100);
  };

  const randomize = () => {
    const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const randomGradient = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];

    setOptions({
      colorScheme: randomScheme.colors,
      shape: randomShape.id as 'circle' | 'square' | 'hexagon' | 'triangle',
      pattern: randomPattern.id as 'none' | 'dots' | 'grid' | 'waves' | 'geometric',
      gradientType: randomGradient.id as 'linear' | 'radial' | 'conic',
      glow: Math.random() > 0.3,
      text: options.text,
      textColor: '#ffffff',
    });
  };

  const downloadImage = () => {
    if (!generatorRef.current) return;
    generatorRef.current.downloadImage('cool-avatar.png');
  };

  const shareImage = async () => {
    if (!generatorRef.current) return;

    try {
      const blob = await generatorRef.current.exportAsBlob('png');
      const file = new File([blob], 'cool-avatar.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Cool Avatar',
          text: 'Check out my stylish profile picture created with FreeProfilePhoto!',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Animated gradient orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: '300px',
              height: '300px',
              background: colorSchemes[i].preview,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="text-gray-300 hover:text-white" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white">Cool Avatar Maker</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Modern</span> Avatar
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Design stunning profile pictures with gradients, geometric shapes, and modern effects
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
            100% Free • Professional Quality • No Watermarks
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
            <Card className="p-4 bg-gray-800/50 backdrop-blur-xl border-gray-700">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-cyan-400" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={randomize}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Randomize Style
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Customization Tabs */}
            <Card className="p-6 bg-gray-800/50 backdrop-blur-xl border-gray-700">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-700">
                  <TabsTrigger value="colors" className="data-[state=active]:bg-gray-600">Colors</TabsTrigger>
                  <TabsTrigger value="shape" className="data-[state=active]:bg-gray-600">Shape</TabsTrigger>
                  <TabsTrigger value="effects" className="data-[state=active]:bg-gray-600">Effects</TabsTrigger>
                </TabsList>

                {/* Color Schemes */}
                <TabsContent value="colors" className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400">Choose Color Scheme</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {colorSchemes.map((scheme) => (
                      <motion.button
                        key={scheme.id}
                        onClick={() => setOptions({ ...options, colorScheme: scheme.colors })}
                        className={`
                          h-24 rounded-xl overflow-hidden relative
                          transition-all cursor-pointer border-2
                          ${options.colorScheme.join(',') === scheme.colors.join(',')
                            ? 'ring-4 ring-cyan-500 scale-105 border-cyan-500'
                            : 'border-gray-600 hover:scale-105'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ background: scheme.preview }}
                        />
                        <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <span className="text-white text-xs font-medium">{scheme.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </TabsContent>

                {/* Shape & Pattern */}
                <TabsContent value="shape" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Shape</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {shapes.map((shape) => (
                        <motion.button
                          key={shape.id}
                          onClick={() => setOptions({ ...options, shape: shape.id as 'circle' | 'square' | 'hexagon' | 'triangle' })}
                          className={`
                            aspect-square rounded-lg flex flex-col items-center justify-center
                            transition-all cursor-pointer
                            ${options.shape === shape.id
                              ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white scale-105'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-xl">{shape.emoji}</span>
                          <span className="text-xs mt-1">{shape.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Pattern Overlay</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {patterns.map((pattern) => (
                        <motion.button
                          key={pattern.id}
                          onClick={() => setOptions({ ...options, pattern: pattern.id as 'none' | 'dots' | 'grid' | 'waves' | 'geometric' })}
                          className={`
                            aspect-square rounded-lg flex flex-col items-center justify-center
                            transition-all cursor-pointer
                            ${options.pattern === pattern.id
                              ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white scale-105'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">{pattern.emoji}</span>
                          <span className="text-xs mt-1">{pattern.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Effects */}
                <TabsContent value="effects" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Gradient Type</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {gradientTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => setOptions({ ...options, gradientType: type.id as 'linear' | 'radial' | 'conic' })}
                          className={`
                            aspect-square rounded-lg flex flex-col items-center justify-center
                            transition-all cursor-pointer
                            ${options.gradientType === type.id
                              ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white scale-105'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-lg">{type.emoji}</span>
                          <span className="text-xs mt-1">{type.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                      <input
                        type="checkbox"
                        checked={options.glow}
                        onChange={(e) => setOptions({ ...options, glow: e.target.checked })}
                        className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500 bg-gray-700 border-gray-600"
                      />
                      <span className="text-sm font-medium">Enable Glow Effect ✨</span>
                    </label>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400">Optional Text</label>
                    <input
                      type="text"
                      value={options.text || ''}
                      onChange={(e) => setOptions({ ...options, text: e.target.value })}
                      placeholder="Add text (optional)"
                      className="w-full mt-2 px-3 py-2 rounded-lg border bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      maxLength={15}
                    />
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
            <Card className="p-8 bg-gray-800/50 backdrop-blur-xl border-gray-700 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-cyan-400 opacity-50" />
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 text-white">Preview</h3>

                {/* Avatar Preview */}
                <motion.div
                  className="relative"
                  animate={isGenerating ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    {preview ? (
                      <motion.img
                        src={preview}
                        alt="Cool Avatar Preview"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Palette className="w-16 h-16 text-gray-600" />
                      </div>
                    )}

                    {isGenerating && (
                      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <RefreshCw className="w-12 h-12 text-cyan-400" />
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
                    <Badge className="bg-cyan-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Pro Quality
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -right-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Badge className="bg-purple-500 text-white border-0">
                      No Watermark
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 px-8"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    size="lg"
                    onClick={shareImage}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button
                    size="lg"
                    onClick={randomize}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    Random
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-8 p-4 rounded-xl bg-gray-900/50 border border-gray-700 max-w-lg">
                  <p className="text-sm text-gray-300 text-center">
                    💡 <strong>Tip:</strong> Combine different gradients, shapes, and patterns
                    to create unique modern designs that stand out!
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Presets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 bg-gray-800/50 backdrop-blur-xl border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  Popular Presets
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { scheme: colorSchemes[0], shape: 'circle', gradient: 'linear' },
                    { scheme: colorSchemes[2], shape: 'hexagon', gradient: 'radial' },
                    { scheme: colorSchemes[4], shape: 'square', gradient: 'conic' },
                    { scheme: colorSchemes[6], shape: 'triangle', gradient: 'linear' },
                  ].map((preset, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        setOptions({
                          ...options,
                          colorScheme: preset.scheme.colors,
                          shape: preset.shape as 'circle' | 'square' | 'hexagon' | 'triangle',
                          gradientType: preset.gradient as 'linear' | 'radial' | 'conic',
                          glow: true,
                        });
                      }}
                      className="aspect-square rounded-xl overflow-hidden relative border-2 border-gray-600 hover:border-cyan-400 transition-all cursor-pointer"
                      style={{ background: preset.scheme.preview }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                        {shapes.find(s => s.id === preset.shape)?.emoji}
                      </div>
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
          <Card className="p-8 bg-gray-800/50 backdrop-blur-xl border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2 text-white">Love Your Modern Avatar?</h3>
            <p className="text-gray-300 mb-4">
              Try our other styles too! Create funny emojis, cute animals, and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Link href="/funny">
                  <Smile className="w-4 h-4 mr-2" />
                  Try Funny Style
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Link href="/cute">
                  <Heart className="w-4 h-4 mr-2" />
                  Try Cute Style
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
