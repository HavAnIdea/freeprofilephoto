'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, CheckCircle, AlertCircle, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TermsPage() {
  const lastUpdated = "October 1, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-200/20"
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
            <Scale className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-700" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800">
              Terms of Service
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
            Terms of <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-800">Service</span>
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Simple, fair terms for using our free profile photo tools
          </p>
          <Badge className="bg-green-500 text-white border-0">
            <CheckCircle className="w-4 h-4 mr-1" />
            100% Free • No Registration Required • No Hidden Fees
          </Badge>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gray-700" />
              Terms Summary (TL;DR)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  What You Can Do
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Use all tools for free</li>
                  <li>✓ Create unlimited avatars</li>
                  <li>✓ Use for personal projects</li>
                  <li>✓ Use for commercial projects</li>
                  <li>✓ Download without watermarks</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-orange-700">
                  <AlertCircle className="w-5 h-5" />
                  What You Can&apos;t Do
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✗ Claim you created this tool</li>
                  <li>✗ Copy/redistribute the code</li>
                  <li>✗ Create harmful content</li>
                  <li>✗ Abuse the service</li>
                  <li>✗ Remove our branding if shown</li>
                </ul>
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
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-gray-700" />
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                By accessing and using FreeProfilePhoto (the &quot;Service&quot;), you accept and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>These Terms apply to all visitors and users of the Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>No registration or account creation is required to use our Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>By using the Service, you confirm you are at least 13 years old (or have parental consent)</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 2 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gray-700" />
              2. Service Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                FreeProfilePhoto provides free, client-side tools for creating and editing profile pictures:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Avatar Generators:</strong> Create cute, funny, cool, anime, and initial-based avatars using browser-based tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Size Helper:</strong> Resize and optimize profile pictures for different social media platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Photo Editor:</strong> Add stickers, effects, and customizations to uploaded images</span>
                </li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>🔧 Technical Note:</strong> All image processing happens in your browser. We don&apos;t have servers that store or process your images.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-gray-700" />
              3. License and Usage Rights
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                <strong>What You Own:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mr-1">✓</span>
                  <span><strong>Your Content:</strong> You retain all rights to images you upload or create using our Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mr-1">✓</span>
                  <span><strong>Commercial Use:</strong> You may use generated avatars for personal or commercial purposes without attribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mr-1">✓</span>
                  <span><strong>No Watermarks:</strong> Downloaded images are free of watermarks and can be used freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mr-1">✓</span>
                  <span><strong>Unlimited Creation:</strong> No limits on the number of avatars you can create or download</span>
                </li>
              </ul>

              <p className="text-gray-700 mb-4 mt-6">
                <strong>What We Own:</strong>
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>The Service itself (website, code, design, branding) is our intellectual property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>You may not copy, redistribute, or create derivative works of our Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>You may not remove or modify any branding, copyright notices, or attribution in the Service</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 4 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-gray-700" />
              4. User Responsibilities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                When using our Service, you agree to:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use the Service only for lawful purposes and in accordance with these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Not upload or create content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Not use images that violate copyright, trademark, or other intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Not attempt to harm, overload, or disrupt the Service or its infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Not use automated tools to scrape or abuse the Service</span>
                </li>
              </ul>

              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Prohibited Content:</strong> Do not create or use avatars for hate speech, impersonation, harassment, illegal activities, or any content that violates others&apos; rights. We reserve the right to refuse service to anyone.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 5 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-gray-700" />
              5. Disclaimer of Warranties
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                The Service is provided <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> without warranties of any kind:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We make no guarantees about the Service&apos;s availability, reliability, or functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We don&apos;t guarantee that the Service will be error-free or uninterrupted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We&apos;re not responsible for any loss of data or content (though nothing is stored on our servers anyway)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Generated avatars are provided as-is; quality may vary based on your input and browser capabilities</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 6 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-gray-700" />
              6. Limitation of Liability
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We&apos;re not responsible for how you use the avatars you create</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>We&apos;re not liable for any disputes arising from copyright or intellectual property issues with content you upload</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Our total liability for any claim shall not exceed $0 (since the Service is free)</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                This is a free service provided as-is. Use at your own risk.
              </p>
            </div>
          </Card>

          {/* Section 7 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gray-700" />
              7. Service Modifications and Termination
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                We reserve the right to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Modify, suspend, or discontinue the Service (or any part of it) at any time without notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Change features, add new features, or remove existing features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Block access to users who violate these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Update these Terms at any time (changes will be posted with a new &quot;Last Updated&quot; date)</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 8 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-gray-700" />
              8. Governing Law and Disputes
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with applicable laws:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Any disputes arising from these Terms or the Service shall be resolved through informal negotiation first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>If informal resolution fails, disputes will be resolved through binding arbitration or small claims court</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>You waive any right to participate in class action lawsuits against us</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 9 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gray-700" />
              9. Miscellaneous
            </h2>
            <div className="prose prose-gray max-w-none">
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong className="text-gray-700">Entire Agreement:</strong> These Terms constitute the entire agreement between you and FreeProfilePhoto regarding the Service.
                </li>
                <li>
                  <strong className="text-gray-700">Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
                </li>
                <li>
                  <strong className="text-gray-700">No Waiver:</strong> Our failure to enforce any right or provision shall not constitute a waiver of such right or provision.
                </li>
                <li>
                  <strong className="text-gray-700">Assignment:</strong> You may not assign or transfer these Terms without our written consent. We may assign these Terms at any time.
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 10 */}
          <Card className="p-8 bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gray-700" />
              10. Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, you can:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Open an issue on our GitHub repository (if open source)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold mr-1">•</span>
                  <span>Contact us through the <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact page</Link></span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We&apos;ll do our best to respond to all inquiries within a reasonable timeframe.
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
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 shadow-xl text-center">
            <Scale className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">Fair & Simple</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We believe in keeping things simple. Use our tools freely, respect others&apos; rights, and enjoy creating amazing profile pictures without restrictions.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                <Link href="/privacy">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
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
