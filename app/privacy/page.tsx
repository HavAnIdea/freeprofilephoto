'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPage() {
  const lastUpdated = "October 1, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Shield className="w-8 h-8" />
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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Privacy Policy
            </span>
          </div>

          <div className="w-24" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your privacy matters. We believe in complete transparency.
          </p>
          <Badge className="bg-green-500 text-white border-0">
            <CheckCircle className="w-4 h-4 mr-1" />
            100% Privacy-First • No Data Collection
          </Badge>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-600" />
              Privacy at a Glance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">No Data Collection</h3>
                <p className="text-sm text-gray-600">
                  We don&apos;t collect, store, or track any personal information
                </p>
              </div>

              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">100% Client-Side</h3>
                <p className="text-sm text-gray-600">
                  All processing happens in your browser. Nothing is uploaded
                </p>
              </div>

              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">No Cookies</h3>
                <p className="text-sm text-gray-600">
                  We don&apos;t use tracking cookies or analytics
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Section 1 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              1. Information We Don&apos;t Collect
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                FreeProfilePhoto is a <strong>completely client-side tool</strong>. This means:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Image Uploads to Servers:</strong> When you upload or create images, they are processed entirely in your browser using JavaScript and Canvas API. No images ever leave your device.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Personal Information:</strong> We don&apos;t collect names, email addresses, IP addresses, or any personally identifiable information.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Account Required:</strong> You can use all features without creating an account or providing any credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Usage Tracking:</strong> We don&apos;t track which features you use, how long you stay, or what you create.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Analytics or Cookies:</strong> We don&apos;t use Google Analytics, Facebook Pixel, or any third-party tracking tools.</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 2 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-blue-600" />
              2. How Your Images Are Processed
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                All image processing happens <strong>100% in your browser</strong>:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>When you upload an image on pages like <strong>/size</strong> or <strong>/funny</strong>, it&apos;s read directly by your browser&apos;s JavaScript engine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>All editing, resizing, cropping, and effects are applied using HTML5 Canvas API in your local browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>Downloaded images are generated client-side and saved directly to your device.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>When you close the browser tab, all images are automatically cleared from memory.</span>
                </li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>🔒 Technical Note:</strong> This is a static website hosted on Vercel. We have no backend servers, no databases, and no API endpoints that could receive or store your data.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              3. Third-Party Services
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                We use minimal third-party services:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong className="text-blue-600">Vercel (Hosting):</strong> Our website is hosted on Vercel&apos;s edge network. Vercel may collect basic server logs (like IP addresses for DDoS protection), but we don&apos;t have access to these logs and they&apos;re not used for tracking individual users.
                </li>
                <li>
                  <strong className="text-blue-600">Cloudflare (if applicable):</strong> If using CDN services, they may cache static assets but don&apos;t process or store user-uploaded images.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>No AI Services:</strong> We don&apos;t use any cloud AI APIs or third-party image processing services. All avatar generation is done with custom JavaScript code running in your browser.
              </p>
            </div>
          </Card>

          {/* Section 4 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              4. Your Rights and Control
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                Since we don&apos;t collect any data, you have complete control:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">✓</span>
                  <span><strong>No Data Requests Needed:</strong> There&apos;s no data to request, export, or delete because we don&apos;t store anything.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">✓</span>
                  <span><strong>Use Offline:</strong> After the initial page load, most features work offline since everything runs in your browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">✓</span>
                  <span><strong>Clear Browser Data:</strong> You can clear your browser cache anytime to remove any locally stored preferences (like theme settings).</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 5 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              5. Children&apos;s Privacy
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700">
                Our service is safe for all ages. Since we don&apos;t collect any personal information, we fully comply with COPPA (Children&apos;s Online Privacy Protection Act) and similar regulations worldwide. Parents can confidently allow children to use our tools without privacy concerns.
              </p>
            </div>
          </Card>

          {/* Section 6 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              6. Changes to This Policy
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                If we ever introduce features that require data collection (which we don&apos;t plan to), we will:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">1.</span>
                  <span>Update this Privacy Policy with clear explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">2.</span>
                  <span>Display a prominent notice on the homepage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">3.</span>
                  <span>Make all data collection features opt-in</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 7 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-blue-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              7. Contact Us
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, you can:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>Open an issue on our GitHub repository (if open source)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mr-1">•</span>
                  <span>Contact us through the <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact page</Link></span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We&apos;re committed to transparency and will respond to privacy inquiries promptly.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Summary Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-xl text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">Our Privacy Promise</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              FreeProfilePhoto is built with privacy as the foundation. We believe powerful tools shouldn&apos;t come at the cost of your privacy. Everything you create stays on your device, period.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <Link href="/terms">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
