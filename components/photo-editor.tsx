'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Image as ImageIcon, X, Download, Share2,
  Camera,
  Circle, Square, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarGenerator, PhotoEditOptions } from '@/lib/avatar-generator';

interface StickerType {
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  id: string;
}

interface PhotoEditorProps {
  onBack?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PhotoEditor({ onBack }: PhotoEditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stickers, setStickers] = useState<StickerType[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [cropShape, setCropShape] = useState<'square' | 'circle'>('square');
  const [filter, setFilter] = useState<'none' | 'grayscale' | 'sepia' | 'vintage' | 'blue' | 'warm'>('none');
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState<'top' | 'bottom'>('bottom');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const generatorRef = useRef<AvatarGenerator | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      generatorRef.current = new AvatarGenerator(400);
    }
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      generatePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage, stickers, cropShape, filter, text, textPosition]);

  const handleFileUpload = async (file: File) => {
    if (!file || !generatorRef.current) return;

    // Check file type
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      alert('Please upload a JPG, PNG, or WEBP image');
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('Please upload an image smaller than 10MB');
      return;
    }

    setIsGenerating(true);

    try {
      // Fix EXIF orientation
      const fixedImage = await generatorRef.current.fixImageOrientation(file);
      setUploadedImage(fixedImage);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try another image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const generatePreview = async () => {
    if (!generatorRef.current || !uploadedImage) return;

    setIsGenerating(true);

    const options: PhotoEditOptions = {
      image: uploadedImage,
      crop: {
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        shape: cropShape,
      },
      stickers: stickers,
      text: text,
      textPosition: textPosition,
      filter: filter,
      backgroundColor: '#ffffff',
    };

    try {
      const result = await generatorRef.current.generatePhotoWithStickers(options);
      setPreview(result);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSticker = (emoji: string) => {
    const newSticker: StickerType = {
      emoji,
      x: 200 + Math.random() * 100 - 50,
      y: 200 + Math.random() * 100 - 50,
      size: 60,
      rotation: 0,
      id: `${Date.now()}-${Math.random()}`,
    };
    setStickers([...stickers, newSticker]);
  };

  const updateSticker = (id: string, updates: Partial<StickerType>) => {
    setStickers(stickers.map(s =>
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const downloadImage = () => {
    if (!generatorRef.current) return;
    generatorRef.current.downloadImage('edited-photo.png');
  };

  const shareImage = async () => {
    if (!generatorRef.current) return;

    try {
      const blob = await generatorRef.current.exportAsBlob('png');
      const file = new File([blob], 'edited-photo.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Edited Photo',
          text: 'Check out my edited photo created with FreeProfilePhoto!',
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

  const clearAll = () => {
    setUploadedImage(null);
    setStickers([]);
    setText('');
    setFilter('none');
    setCropShape('square');
    setPreview('');
  };

  const emojiStickers = [
    '😂', '🤣', '😎', '🥳', '🤩', '😍', '🥰', '😘',
    '🎉', '🎊', '🎈', '🎁', '⭐', '✨', '💖', '💕',
    '🔥', '💯', '👑', '🌟', '🌈', '☀️', '🌸', '🦋',
  ];

  const filters = [
    { id: 'none', name: 'Original', icon: '🎨' },
    { id: 'grayscale', name: 'B&W', icon: '⚫' },
    { id: 'sepia', name: 'Sepia', icon: '🟤' },
    { id: 'vintage', name: 'Vintage', icon: '📷' },
    { id: 'blue', name: 'Cool', icon: '💙' },
    { id: 'warm', name: 'Warm', icon: '🧡' },
  ];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!uploadedImage ? (
          // Upload interface
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <div
              ref={dropZoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative w-full aspect-square max-w-md mx-auto rounded-2xl border-2 border-dashed
                transition-all duration-300 cursor-pointer
                ${isDragging
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 scale-105'
                  : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/10'
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  animate={{ y: isDragging ? -10 : 0 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag & drop or click to browse
                </p>
                <Badge variant="secondary">
                  JPG, PNG, WEBP • Max 10MB
                </Badge>

                {/* Sample images for quick start */}
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground mb-2">Or try with camera:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.capture = 'user';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleFileUpload(file);
                      };
                      input.click();
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>

              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 rounded-2xl flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <ImageIcon className="w-12 h-12 text-purple-500" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // Editor interface
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel - Tools */}
              <div className="lg:col-span-1 space-y-4">
                {/* Quick Actions */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 text-sm">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Change
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cropShape === 'square' ? 'bg-purple-100' : ''}
                      onClick={() => setCropShape('square')}
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Square
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cropShape === 'circle' ? 'bg-purple-100' : ''}
                      onClick={() => setCropShape('circle')}
                    >
                      <Circle className="w-4 h-4 mr-1" />
                      Circle
                    </Button>
                  </div>
                </Card>

                {/* Editor Tabs */}
                <Card className="p-4">
                  <Tabs defaultValue="stickers" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-3">
                      <TabsTrigger value="stickers" className="text-xs">Stickers</TabsTrigger>
                      <TabsTrigger value="filters" className="text-xs">Filters</TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
                    </TabsList>

                    {/* Stickers Tab */}
                    <TabsContent value="stickers" className="space-y-3">
                      <div className="grid grid-cols-4 gap-2">
                        {emojiStickers.map((emoji) => (
                          <motion.button
                            key={emoji}
                            onClick={() => addSticker(emoji)}
                            className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900 flex items-center justify-center text-2xl transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>

                      {/* Sticker controls */}
                      {selectedSticker && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Size</span>
                            <Slider
                              className="w-24"
                              min={20}
                              max={150}
                              step={5}
                              value={[stickers.find(s => s.id === selectedSticker)?.size || 60]}
                              onValueChange={([value]) => updateSticker(selectedSticker, { size: value })}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Rotation</span>
                            <Slider
                              className="w-24"
                              min={-180}
                              max={180}
                              step={15}
                              value={[stickers.find(s => s.id === selectedSticker)?.rotation || 0]}
                              onValueChange={([value]) => updateSticker(selectedSticker, { rotation: value })}
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              removeSticker(selectedSticker);
                              setSelectedSticker(null);
                            }}
                          >
                            Remove Sticker
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    {/* Filters Tab */}
                    <TabsContent value="filters" className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {filters.map((f) => (
                          <motion.button
                            key={f.id}
                            onClick={() => setFilter(f.id as 'none' | 'grayscale' | 'sepia' | 'vintage' | 'blue' | 'warm')}
                            className={`
                              p-3 rounded-lg border transition-all
                              ${filter === f.id
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                              }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-2xl mb-1">{f.icon}</div>
                            <div className="text-xs">{f.name}</div>
                          </motion.button>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Text Tab */}
                    <TabsContent value="text" className="space-y-3">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add text..."
                        className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
                        maxLength={30}
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={textPosition === 'top' ? 'bg-purple-100' : ''}
                          onClick={() => setTextPosition('top')}
                        >
                          Top
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={textPosition === 'bottom' ? 'bg-purple-100' : ''}
                          onClick={() => setTextPosition('bottom')}
                        >
                          Bottom
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>

              {/* Center/Right - Preview */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Preview */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Edited preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}

                      {isGenerating && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Filter className="w-12 h-12 text-purple-500" />
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-6 justify-center">
                      <Button
                        onClick={downloadImage}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={shareImage}
                        variant="outline"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}