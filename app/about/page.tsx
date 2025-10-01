import ComingSoon from '@/components/coming-soon';

export default function AboutPage() {
  return (
    <ComingSoon
      title="About FreeProfilePhoto"
      description="Learn more about our mission to provide free, high-quality avatar generation for everyone. Our story is coming soon!"
      expectedDate="Coming Soon"
      color="from-purple-500 to-pink-500"
      features={[
        'Our mission and values',
        'The team behind the project',
        'Technology and innovation',
        'Future roadmap',
        'Community contributions',
        'Partnership opportunities',
      ]}
    />
  );
}