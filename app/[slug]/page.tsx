import { getPage } from "@/lib/pageUtils";
import Link from "next/link";
import Card from "@/components/Card";
import ImageBlock from "@/components/ImageBlock";
import TextSection from "@/components/TextSection";
import StatsBox from "@/components/StatsBox";
import CTA from "@/components/CTA";

const componentMap: Record<string, any> = {
  Card,
  ImageBlock,
  TextSection,
  StatsBox,
  CTA,
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return (
      <div className=" ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h1>
          <p className="text-gray-600 mb-6">The page "{slug}" doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-blue-600  font-medium mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {page.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p className="text-gray-600">Built with {page.components.length} components</p>
        </div>
        
        <div className="space-y-6">
          {page.components.map((block, i) => {
            const Component = componentMap[block.type];
            if (!Component) return null;
            return <Component key={i} {...block.props} />;
          })}
        </div>
      </div>
    </div>
  );
}
