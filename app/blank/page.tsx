'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Download, Share2, Shuffle, ArrowLeft, Type, Palette,
  Circle, Square, Hexagon, Triangle, Sparkles, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ColorScheme {
  id: string;
  name: string;
  background: string;
  text: string;
}

interface BackgroundPattern {
  id: string;
  name: string;
  emoji: string;
}

const colorSchemes: ColorScheme[] = [
  { id: 'blue', name: 'Ocean Blue', background: '#3b82f6', text: '#ffffff' },
  { id: 'purple', name: 'Royal Purple', background: '#8b5cf6', text: '#ffffff' },
  { id: 'pink', name: 'Rose Pink', background: '#ec4899', text: '#ffffff' },
  { id: 'green', name: 'Forest Green', background: '#10b981', text: '#ffffff' },
  { id: 'orange', name: 'Sunset Orange', background: '#f59e0b', text: '#ffffff' },
  { id: 'red', name: 'Ruby Red', background: '#ef4444', text: '#ffffff' },
  { id: 'cyan', name: 'Ocean Cyan', background: '#06b6d4', text: '#ffffff' },
  { id: 'indigo', name: 'Deep Indigo', background: '#6366f1', text: '#ffffff' },
  { id: 'teal', name: 'Teal Green', background: '#14b8a6', text: '#ffffff' },
  { id: 'rose', name: 'Dusty Rose', background: '#f43f5e', text: '#ffffff' },
  { id: 'violet', name: 'Soft Violet', background: '#a78bfa', text: '#ffffff' },
  { id: 'lime', name: 'Fresh Lime', background: '#84cc16', text: '#ffffff' },
];

const gradientSchemes: ColorScheme[] = [
  { id: 'sunset', name: 'Sunset', background: 'linear-gradient(135deg, #ff6b6b, #feca57)', text: '#ffffff' },
  { id: 'ocean', name: 'Ocean', background: 'linear-gradient(135deg, #667eea, #764ba2)', text: '#ffffff' },
  { id: 'forest', name: 'Forest', background: 'linear-gradient(135deg, #11998e, #38ef7d)', text: '#ffffff' },
  { id: 'berry', name: 'Berry', background: 'linear-gradient(135deg, #ee9ca7, #ffdde1)', text: '#ffffff' },
  { id: 'cosmic', name: 'Cosmic', background: 'linear-gradient(135deg, #fa709a, #fee140)', text: '#ffffff' },
  { id: 'aurora', name: 'Aurora', background: 'linear-gradient(135deg, #a8edea, #fed6e3)', text: '#ffffff' },
];

const backgroundPatterns: BackgroundPattern[] = [
  { id: 'none', name: 'Solid', emoji: '⬜' },
  { id: 'dots', name: 'Dots', emoji: '⋯' },
  { id: 'grid', name: 'Grid', emoji: '⊞' },
  { id: 'waves', name: 'Waves', emoji: '〰' },
  { id: 'diagonal', name: 'Diagonal', emoji: '⟋' },
  { id: 'circles', name: 'Circles', emoji: '◯' },
];

const shapes = [
  { id: 'circle', name: 'Circle', icon: Circle },
  { id: 'square', name: 'Square', icon: Square },
  { id: 'hexagon', name: 'Hexagon', icon: Hexagon },
  { id: 'triangle', name: 'Triangle', icon: Triangle },
];

export default function BlankAvatarPage() {
  const [initials, setInitials] = useState('FP');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemes[0]);
  const [shape, setShape] = useState('circle');
  const [pattern, setPattern] = useState('none');
  const [fontSize, setFontSize] = useState(120);
  const [preview, setPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initials, colorScheme, shape, pattern, fontSize]);

  const generateAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    setIsGenerating(true);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background
    if (colorScheme.background.startsWith('linear-gradient')) {
      // Extract colors from gradient
      const matches = colorScheme.background.match(/#[0-9a-f]{6}/gi);
      if (matches && matches.length >= 2) {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, matches[0]);
        gradient.addColorStop(1, matches[1]);
        ctx.fillStyle = gradient;
      }
    } else {
      ctx.fillStyle = colorScheme.background;
    }

    // Draw shape
    drawShape(ctx, size, shape);

    // Draw pattern
    if (pattern !== 'none') {
      drawPattern(ctx, size, pattern);
    }

    // Draw initials
    ctx.fillStyle = colorScheme.text;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials.toUpperCase().slice(0, 2), size / 2, size / 2);

    setPreview(canvas.toDataURL('image/png'));
    setIsGenerating(false);
  };

  const drawShape = (ctx: CanvasRenderingContext2D, size: number, shapeType: string) => {
    ctx.save();
    ctx.beginPath();

    switch (shapeType) {
      case 'circle':
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        break;

      case 'square':
        ctx.rect(0, 0, size, size);
        break;

      case 'hexagon':
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2;
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;

      case 'triangle':
        ctx.moveTo(size / 2, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(size, size);
        ctx.closePath();
        break;
    }

    ctx.fill();
    ctx.clip();
    ctx.restore();
  };

  const drawPattern = (ctx: CanvasRenderingContext2D, size: number, patternType: string) => {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;

    switch (patternType) {
      case 'dots':
        for (let x = 0; x < size; x += 30) {
          for (let y = 0; y < size; y += 30) {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'grid':
        for (let x = 0; x < size; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, size);
          ctx.stroke();
        }
        for (let y = 0; y < size; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(size, y);
          ctx.stroke();
        }
        break;

      case 'waves':
        ctx.beginPath();
        for (let y = 0; y < size; y += 40) {
          ctx.moveTo(0, y);
          for (let x = 0; x < size; x += 10) {
            ctx.lineTo(x, y + Math.sin(x / 20) * 10);
          }
        }
        ctx.stroke();
        break;

      case 'diagonal':
        for (let i = -size; i < size * 2; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + size, size);
          ctx.stroke();
        }
        break;

      case 'circles':
        for (let x = 0; x < size; x += 60) {
          for (let y = 0; y < size; y += 60) {
            ctx.beginPath();
            ctx.arc(x + 30, y + 30, 20, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        break;
    }

    ctx.restore();
  };

  const handleNameChange = (name: string) => {
    if (!name) {
      setInitials('FP');
      return;
    }

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      setInitials(parts[0].slice(0, 2));
    } else {
      setInitials((parts[0][0] || '') + (parts[parts.length - 1][0] || ''));
    }
  };

  const randomize = () => {
    const allSchemes = [...colorSchemes, ...gradientSchemes];
    const randomScheme = allSchemes[Math.floor(Math.random() * allSchemes.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomPattern = backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)];

    setColorScheme(randomScheme);
    setShape(randomShape.id);
    setPattern(randomPattern.id);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `blank-avatar-${initials}.png`;
    link.href = preview;
    link.click();
  };

  const shareImage = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        {/* Floating letters */}
        {['A', 'B', 'C', 'X', 'Y', 'Z'].map((letter) => (
          <motion.div
            key={letter}
            className="absolute text-6xl font-bold text-purple-200/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="text-purple-600 hover:text-purple-700" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Initial Avatar Maker
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
            Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">Initial</span> Avatars
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional initial-based avatars for anonymous profiles, placeholders, or personal branding
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0">
            <Sparkles className="w-4 h-4 mr-1" />
            100% Free • 12 Colors • 6 Patterns • 4 Shapes
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
            <Card className="p-4 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-purple-700">
                <Zap className="w-4 h-4" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={randomize}
                  className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Randomize Style
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  className="w-full border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Avatar
                </Button>
              </div>
            </Card>

            {/* Name Input */}
            <Card className="p-6 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-600" />
                Enter Name or Initials
              </h3>
              <input
                type="text"
                placeholder="e.g., John Doe or JD"
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-lg"
                maxLength={30}
              />
              <p className="text-sm text-gray-500 mt-2">
                Current initials: <strong className="text-purple-600">{initials}</strong>
              </p>
            </Card>

            {/* Customization Tabs */}
            <Card className="p-6 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-purple-100">
                  <TabsTrigger value="colors" className="data-[state=active]:bg-white">Colors</TabsTrigger>
                  <TabsTrigger value="shapes" className="data-[state=active]:bg-white">Shapes</TabsTrigger>
                  <TabsTrigger value="patterns" className="data-[state=active]:bg-white">Patterns</TabsTrigger>
                </TabsList>

                {/* Colors Tab */}
                <TabsContent value="colors" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Solid Colors</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {colorSchemes.map((scheme) => (
                        <motion.button
                          key={scheme.id}
                          onClick={() => setColorScheme(scheme)}
                          className={`
                            aspect-square rounded-lg transition-all
                            ${colorScheme.id === scheme.id
                              ? 'ring-4 ring-purple-500 scale-110 shadow-lg'
                              : 'hover:scale-105'
                            }
                          `}
                          style={{ backgroundColor: scheme.background }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title={scheme.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Gradients</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {gradientSchemes.map((scheme) => (
                        <motion.button
                          key={scheme.id}
                          onClick={() => setColorScheme(scheme)}
                          className={`
                            h-16 rounded-lg transition-all
                            ${colorScheme.id === scheme.id
                              ? 'ring-4 ring-purple-500 scale-105 shadow-lg'
                              : 'hover:scale-105'
                            }
                          `}
                          style={{ background: scheme.background }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title={scheme.name}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Shapes Tab */}
                <TabsContent value="shapes" className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Select Shape</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {shapes.map((s) => {
                      const Icon = s.icon;
                      return (
                        <motion.button
                          key={s.id}
                          onClick={() => setShape(s.id)}
                          className={`
                            p-4 rounded-xl flex flex-col items-center justify-center transition-all
                            ${shape === s.id
                              ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white scale-105 shadow-lg'
                              : 'bg-gray-50 hover:bg-gray-100'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-8 h-8 mb-2" />
                          <span className="text-sm font-medium">{s.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Patterns Tab */}
                <TabsContent value="patterns" className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Background Pattern</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {backgroundPatterns.map((p) => (
                      <motion.button
                        key={p.id}
                        onClick={() => setPattern(p.id)}
                        className={`
                          aspect-square rounded-lg flex flex-col items-center justify-center transition-all
                          ${pattern === p.id
                            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white scale-105 shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl mb-1">{p.emoji}</span>
                        <span className="text-xs font-medium">{p.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="180"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
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
            <Card className="p-8 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  Your Initial Avatar
                </h3>

                {/* Avatar Preview */}
                <motion.div
                  className="relative"
                  animate={isGenerating ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200">
                    {preview ? (
                      <motion.img
                        src={preview}
                        alt="Initial Avatar Preview"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-200 to-fuchsia-200 flex items-center justify-center">
                        <Type className="w-16 h-16 text-purple-400" />
                      </div>
                    )}
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -left-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="bg-violet-500 text-white border-0 shadow-lg">
                      <Palette className="w-3 h-3 mr-1" />
                      Custom
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -right-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Badge className="bg-fuchsia-500 text-white border-0 shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Professional
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center mt-8">
                  <Button
                    size="lg"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 px-8"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="lg"
                    onClick={shareImage}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button
                    size="lg"
                    onClick={randomize}
                    variant="outline"
                    className="border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50 px-8"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    Random
                  </Button>
                </div>

                {/* Tips */}
                <div className="w-full max-w-lg p-4 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-purple-200 mt-8">
                  <p className="text-sm text-gray-700 text-center">
                    💡 <strong>Pro Tip:</strong> These avatars are perfect for default profile pictures,
                    placeholder images, or professional branding. Download in high resolution!
                  </p>
                </div>
              </div>
            </Card>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Perfect For</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-violet-50">
                    <div className="text-2xl mb-2">👤</div>
                    <div className="text-sm font-medium">Anonymous Profiles</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50">
                    <div className="text-2xl mb-2">🔐</div>
                    <div className="text-sm font-medium">Privacy Protection</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-fuchsia-50">
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="text-sm font-medium">Personal Branding</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Try Other Styles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <Card className="p-6 bg-white/80 backdrop-blur-xl border-purple-200 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Try Other Avatar Styles
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                    <Link href="/anime">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Anime Style
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    <Link href="/funny">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Funny Style
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                    <Link href="/cute">
                      <Sparkles className="w-4 h-4 mr-2" />
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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
