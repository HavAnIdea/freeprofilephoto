'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, Download, Share2, ArrowLeft, Ruler, Crop,
  Instagram, Linkedin, Facebook, MessageCircle, Zap,
  Check, Image as ImageIcon, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  size: number;
  displaySize: string;
  description: string;
  color: string;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    size: 320,
    displaySize: '320x320',
    description: 'Square profile picture',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'instagram-hd',
    name: 'Instagram HD',
    icon: <Instagram className="w-5 h-5" />,
    size: 640,
    displaySize: '640x640',
    description: 'High quality profile',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
    size: 400,
    displaySize: '400x400',
    description: 'Professional profile',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'linkedin-hd',
    name: 'LinkedIn HD',
    icon: <Linkedin className="w-5 h-5" />,
    size: 800,
    displaySize: '800x800',
    description: 'High quality professional',
    color: 'from-blue-700 to-blue-800'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    size: 170,
    displaySize: '170x170',
    description: 'Profile picture',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'facebook-hd',
    name: 'Facebook HD',
    icon: <Facebook className="w-5 h-5" />,
    size: 320,
    displaySize: '320x320',
    description: 'High quality profile',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <MessageCircle className="w-5 h-5" />,
    size: 128,
    displaySize: '128x128',
    description: 'Avatar icon',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'discord-hd',
    name: 'Discord HD',
    icon: <MessageCircle className="w-5 h-5" />,
    size: 512,
    displaySize: '512x512',
    description: 'High quality avatar',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <MessageCircle className="w-5 h-5" />,
    size: 640,
    displaySize: '640x640',
    description: 'Profile photo',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <Zap className="w-5 h-5" />,
    size: 400,
    displaySize: '400x400',
    description: 'Profile image',
    color: 'from-sky-500 to-blue-500'
  },
];

export default function SizeHelperPage() {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    setIsProcessing(true);

    try {
      // Load image
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          setUploadedImage(img);
          setImagePreview(e.target?.result as string);
          setIsProcessing(false);
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error loading image:', error);
      alert('Failed to load image. Please try again.');
      setIsProcessing(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    const newSelected = new Set(selectedPlatforms);
    if (newSelected.has(platformId)) {
      newSelected.delete(platformId);
    } else {
      newSelected.add(platformId);
    }
    setSelectedPlatforms(newSelected);
  };

  const selectAllPlatforms = () => {
    if (selectedPlatforms.size === platforms.length) {
      setSelectedPlatforms(new Set());
    } else {
      setSelectedPlatforms(new Set(platforms.map(p => p.id)));
    }
  };

  const downloadSize = (platform: Platform) => {
    if (!uploadedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = platform.size;
    canvas.width = size;
    canvas.height = size;

    // Calculate crop to maintain aspect ratio (center crop)
    const sourceSize = Math.min(uploadedImage.width, uploadedImage.height);
    const sourceX = (uploadedImage.width - sourceSize) / 2;
    const sourceY = (uploadedImage.height - sourceSize) / 2;

    // Draw cropped and resized image
    ctx.drawImage(
      uploadedImage,
      sourceX, sourceY, sourceSize, sourceSize,
      0, 0, size, size
    );

    // Download
    const link = document.createElement('a');
    link.download = `profile-${platform.id}-${platform.displaySize}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadSelectedSizes = () => {
    if (selectedPlatforms.size === 0) {
      alert('Please select at least one platform size');
      return;
    }

    selectedPlatforms.forEach(platformId => {
      const platform = platforms.find(p => p.id === platformId);
      if (platform) {
        setTimeout(() => downloadSize(platform), 100);
      }
    });
  };

  const shareImage = async () => {
    if (!uploadedImage || selectedPlatforms.size === 0) return;

    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Floating measurement icons */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Ruler className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Profile Size Helper
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
            Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Profile Sizes</span> for Every Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload once, download optimized profile pictures for Instagram, LinkedIn, Facebook, Discord, WhatsApp, and more
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
            <Check className="w-4 h-4 mr-1" />
            100% Free • 10+ Platform Sizes • Perfect Quality
          </Badge>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {!uploadedImage ? (
            /* Upload Section */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-12 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Upload className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="text-2xl font-bold mb-2">Upload Your Profile Picture</h2>
                  <p className="text-gray-600 mb-6">
                    Support JPG, PNG, WebP formats • Max 10MB
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <Button
                    size="lg"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 px-12 py-6 text-lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {isProcessing ? 'Loading...' : 'Choose Image'}
                  </Button>

                  <p className="text-sm text-gray-500 mt-4">
                    Or drag and drop your image here
                  </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-blue-200">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Crop className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Auto Crop</h3>
                    <p className="text-sm text-gray-600">Perfectly centered square crop</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Optimized Quality</h3>
                    <p className="text-sm text-gray-600">Best quality for each platform</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Download className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Batch Download</h3>
                    <p className="text-sm text-gray-600">Download all sizes at once</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            /* Editor Section */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Panel - Preview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl sticky top-24">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    Original Image
                  </h3>

                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img
                      src={imagePreview}
                      alt="Uploaded profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      setUploadedImage(null);
                      setImagePreview('');
                      setSelectedPlatforms(new Set());
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Different Image
                  </Button>
                </Card>
              </motion.div>

              {/* Right Panel - Platform Sizes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Actions */}
                <Card className="p-4 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        {selectedPlatforms.size} Selected
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllPlatforms}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {selectedPlatforms.size === platforms.length ? 'Deselect All' : 'Select All'}
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={downloadSelectedSizes}
                        disabled={selectedPlatforms.size === 0}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Selected
                      </Button>
                      <Button
                        variant="outline"
                        onClick={shareImage}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Platform Sizes Grid */}
                <Card className="p-6 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Select Platform Sizes</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {platforms.map((platform) => {
                      const isSelected = selectedPlatforms.has(platform.id);

                      return (
                        <motion.div
                          key={platform.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => togglePlatform(platform.id)}
                            className={`
                              p-4 rounded-xl cursor-pointer transition-all
                              ${isSelected
                                ? `bg-gradient-to-r ${platform.color} text-white shadow-lg scale-105`
                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                              }
                            `}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {platform.icon}
                                <span className="font-semibold">{platform.name}</span>
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5" />
                              )}
                            </div>

                            <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                              {platform.displaySize}
                            </div>
                            <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                              {platform.description}
                            </div>

                            {isSelected && (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white border-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadSize(platform);
                                }}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>

                {/* Tips */}
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Pro Tip:</strong> Your image will be automatically center-cropped to a square format.
                    Make sure your face or main subject is centered for best results!
                  </p>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Platform Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Platform Size Guide</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-purple-600" />
                    Instagram
                  </h3>
                  <p className="text-sm text-gray-600">
                    320x320 for standard quality, 640x640 for high-definition display. Square format only.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </h3>
                  <p className="text-sm text-gray-600">
                    400x400 minimum, 800x800 recommended for professional quality. Use clear headshot.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-sky-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </h3>
                  <p className="text-sm text-gray-600">
                    170x170 minimum, 320x320 recommended. Displayed as circle on mobile.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-indigo-600" />
                    Discord
                  </h3>
                  <p className="text-sm text-gray-600">
                    128x128 minimum, 512x512 for animated avatars. Circular format.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    WhatsApp
                  </h3>
                  <p className="text-sm text-gray-600">
                    640x640 recommended for clear display on all devices. Circular crop.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-sky-600" />
                    Twitter/X
                  </h3>
                  <p className="text-sm text-gray-600">
                    400x400 minimum for profile picture. Displayed as circle.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Try Other Styles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Card className="p-6 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Want to Create a Profile Picture?
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
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
