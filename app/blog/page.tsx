import ComingSoon from '@/components/coming-soon';

export default function BlogPage() {
  return (
    <ComingSoon
      title="FreeProfilePhoto Blog"
      description="Tips, tutorials, and inspiration for creating the perfect profile picture. Our blog is launching soon!"
      expectedDate="Coming Soon"
      color="from-indigo-500 to-purple-500"
      features={[
        'Profile picture best practices',
        'Social media image guides',
        'Design tips and tricks',
        'User success stories',
        'Feature announcements',
        'Creative inspiration gallery',
      ]}
    />
  );
}