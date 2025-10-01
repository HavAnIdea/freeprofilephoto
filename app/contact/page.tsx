import ComingSoon from '@/components/coming-soon';

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      description="Have questions or feedback? Our contact form is coming soon. We'd love to hear from you!"
      expectedDate="Coming Soon"
      color="from-teal-500 to-cyan-500"
      features={[
        'Direct contact form',
        'Feature requests',
        'Bug reports',
        'Business inquiries',
        'Community support',
        'Social media links',
      ]}
    />
  );
}