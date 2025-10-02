'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, Download, Share2, Shuffle, ArrowLeft, Palette,
  Zap, Heart, Trophy, Stars,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarGenerator, FunnyAvatarOptions } from '@/lib/avatar-generator';
import PhotoEditor from '@/components/photo-editor';

const funnyFaces = [
  '😂', '🤣', '😅', '😆', '😁', '😄', '😃', '😀',
  '🤪', '😜', '😝', '🤗', '🤭', '🤫', '🤔', '🤨',
  '😏', '😎', '🤓', '🧐', '😱', '😵', '🤯', '🥳',
  '🥴', '😬', '🤐', '😷', '🤢', '🤮', '🥶', '🥵',
];

const accessories = [
  { emoji: '🎉', label: 'Party' },
  { emoji: '🎊', label: 'Celebration' },
  { emoji: '🎈', label: 'Balloon' },
  { emoji: '🎁', label: 'Gift' },
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍔', label: 'Burger' },
  { emoji: '🍩', label: 'Donut' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🍺', label: 'Beer' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '⚽', label: 'Soccer' },
  { emoji: '🎸', label: 'Guitar' },
];

const backgrounds = [
  { id: 'gradient-1', name: 'Purple Dream', color: '#667eea' },
  { id: 'gradient-2', name: 'Pink Sunset', color: '#f093fb' },
  { id: 'gradient-3', name: 'Ocean Blue', color: '#4facfe' },
  { id: 'rainbow', name: 'Rainbow', color: 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #ff00ff)' },
  { id: 'dots', name: 'Polka Dots', color: '#ffd93d' },
  { id: 'solid', name: 'Solid Color', color: '#6366f1' },
];

type EditorMode = 'emoji' | 'photo';

export default function FunnyGeneratorPage() {
  const [editorMode, setEditorMode] = useState<EditorMode>('emoji');
  const [options, setOptions] = useState<FunnyAvatarOptions>({
    face: '😂',
    accessories: [],
    background: 'gradient-1',
    text: '',
    textColor: '#ffffff',
    backgroundColor: '#667eea',
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
    if (editorMode === 'emoji') {
      generatePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, editorMode]);

  const generatePreview = () => {
    if (!generatorRef.current || editorMode !== 'emoji') return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = generatorRef.current!.generateFunny(options);
      setPreview(result);
      setIsGenerating(false);
    }, 100);
  };

  const randomize = () => {
    const randomFace = funnyFaces[Math.floor(Math.random() * funnyFaces.length)];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomAccessories = accessories
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .map(a => a.emoji);

    setOptions({
      ...options,
      face: randomFace,
      background: randomBg.id,
      backgroundColor: randomBg.color,
      accessories: randomAccessories,
    });
  };

  const downloadImage = () => {
    if (!generatorRef.current || editorMode !== 'emoji') return;
    generatorRef.current.downloadImage('funny-avatar.png');
  };

  const shareImage = async () => {
    if (!generatorRef.current || editorMode !== 'emoji') return;

    try {
      const blob = await generatorRef.current.exportAsBlob('png');
      const file = new File([blob], 'funny-avatar.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Funny Avatar',
          text: 'Check out my funny profile picture created with FreeProfilePhoto!',
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">Funny Avatar Maker</span>
          </div>

          <div className="w-24" /> {/* Spacer for centering */}
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
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Funny</span> Avatar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose between emoji avatars or upload your photo to add fun stickers and effects
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            100% Free • No Watermarks
          </Badge>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto mb-8"
        >
          <div className="flex gap-4">
            <Button
              onClick={() => setEditorMode('emoji')}
              className={`flex-1 py-6 ${
                editorMode === 'emoji'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mr-3">😂</span>
              <div className="text-left">
                <div className="font-semibold">Emoji Avatar</div>
                <div className="text-xs opacity-90">Create from emojis</div>
              </div>
            </Button>

            <Button
              onClick={() => setEditorMode('photo')}
              className={`flex-1 py-6 ${
                editorMode === 'photo'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              <ImageIcon className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Photo Editor</div>
                <div className="text-xs opacity-90">Upload & edit photo</div>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Conditional Rendering based on mode */}
        <AnimatePresence mode="wait">
          {editorMode === 'photo' ? (
            <motion.div
              key="photo-editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PhotoEditor onBack={() => setEditorMode('emoji')} />
            </motion.div>
          ) : (
            <motion.div
              key="emoji-editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Original Emoji Editor Layout */}
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Left Panel - Options */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-1 space-y-6"
                >
                  {/* Quick Actions */}
                  <Card className="p-4 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button
                        onClick={randomize}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:shadow-2xl"
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Randomize
                      </Button>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={shareImage}
                        variant="outline"
                        className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </Card>

                  {/* Customization Tabs */}
                  <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl">
                    <Tabs defaultValue="face" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="face">Face</TabsTrigger>
                        <TabsTrigger value="accessories">Extras</TabsTrigger>
                        <TabsTrigger value="background">Background</TabsTrigger>
                      </TabsList>

                      {/* Face Selection */}
                      <TabsContent value="face" className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Choose Your Face</h4>
                        <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-2">
                          {funnyFaces.map((face) => (
                            <motion.button
                              key={face}
                              onClick={() => setOptions({ ...options, face })}
                              className={`
                                aspect-square rounded-xl flex items-center justify-center text-3xl
                                transition-all cursor-pointer hover:scale-110
                                ${options.face === face
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg scale-105'
                                  : 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl hover:shadow-md'
                                }
                              `}
                              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {face}
                            </motion.button>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Accessories Selection */}
                      <TabsContent value="accessories" className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Add Accessories (Select up to 4)
                        </h4>
                        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-2">
                          {accessories.map((item) => {
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
                                  } else if (current.length < 4) {
                                    setOptions({
                                      ...options,
                                      accessories: [...current, item.emoji],
                                    });
                                  }
                                }}
                                className={`
                                  aspect-square rounded-xl flex flex-col items-center justify-center
                                  transition-all cursor-pointer
                                  ${isSelected
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white scale-105'
                                    : 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl hover:shadow-md'
                                  }
                                `}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="text-2xl">{item.emoji}</span>
                                <span className="text-xs mt-1">{item.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </TabsContent>

                      {/* Background Selection */}
                      <TabsContent value="background" className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Select Background</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {backgrounds.map((bg) => (
                            <motion.button
                              key={bg.id}
                              onClick={() => setOptions({
                                ...options,
                                background: bg.id,
                                backgroundColor: bg.color,
                              })}
                              className={`
                                h-24 rounded-xl overflow-hidden relative
                                transition-all cursor-pointer
                                ${options.background === bg.id
                                  ? 'ring-4 ring-purple-500 scale-105'
                                  : 'hover:scale-105'
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div
                                className="absolute inset-0"
                                style={{ background: bg.color }}
                              />
                              <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent">
                                <span className="text-white text-sm font-medium">{bg.name}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Optional Text */}
                        <div className="mt-4 space-y-2">
                          <label className="text-sm font-medium">Optional Text</label>
                          <input
                            type="text"
                            value={options.text || ''}
                            onChange={(e) => setOptions({ ...options, text: e.target.value })}
                            placeholder="Add text (optional)"
                            className="w-full px-3 py-2 rounded-lg border bg-background"
                            maxLength={20}
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
                  <Card className="p-8 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-6 h-6 text-purple-500 opacity-50" />
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
                        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                          {preview ? (
                            <motion.img
                              src={preview}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <Sparkles className="w-16 h-16 text-gray-400" />
                            </div>
                          )}

                          {isGenerating && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Sparkles className="w-12 h-12 text-purple-500" />
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
                          <Badge className="bg-yellow-500 text-white">
                            <Trophy className="w-3 h-3 mr-1" />
                            High Quality
                          </Badge>
                        </motion.div>

                        <motion.div
                          className="absolute -bottom-4 -right-4"
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          <Badge className="bg-green-500 text-white">
                            No Watermark!
                          </Badge>
                        </motion.div>
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="mt-8 flex flex-wrap gap-3 justify-center">
                        <Button
                          size="lg"
                          onClick={downloadImage}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:shadow-2xl px-8"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download PNG
                        </Button>
                        <Button
                          size="lg"
                          onClick={shareImage}
                          variant="outline"
                          className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-8"
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Share
                        </Button>
                        <Button
                          size="lg"
                          onClick={randomize}
                          variant="outline"
                          className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-8"
                        >
                          <Shuffle className="w-5 h-5 mr-2" />
                          Random
                        </Button>
                      </div>

                      {/* Tips */}
                      <div className="mt-8 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 max-w-lg">
                        <p className="text-sm text-muted-foreground text-center">
                          💡 <strong>Tip:</strong> Click &quot;Randomize&quot; to get instant inspiration,
                          or customize every detail to match your personality!
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Example Showcase */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <Card className="p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Stars className="w-5 h-5 text-yellow-500" />
                        Popular Combinations
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {['😂🎉', '🤪🍕', '😎🎸', '🥳🎊'].map((combo, i) => (
                          <motion.button
                            key={combo}
                            onClick={() => {
                              const [face, ...accessories] = combo.split('');
                              setOptions({
                                ...options,
                                face,
                                accessories,
                                background: backgrounds[i].id,
                              });
                            }}
                            className="aspect-square rounded-xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {combo}
                          </motion.button>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Love Your Avatar?</h3>
            <p className="text-muted-foreground mb-4">
              Try our other styles too! Create cute animal avatars, anime characters, and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline" className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link href="/cute">
                  <Heart className="w-4 h-4 mr-2" />
                  Try Cute Style
                </Link>
              </Button>
              <Button asChild variant="outline" className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link href="/cool">
                  <Palette className="w-4 h-4 mr-2" />
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
