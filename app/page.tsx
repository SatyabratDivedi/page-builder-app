import { getAllPages } from "@/lib/pageUtils"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function HomePage() {
	const pages = await getAllPages()

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-gray-900 text-center">
					Page Builder
				</h1>

				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-2xl font-semibold text-gray-800">
							Available Pages
						</h2>
						<Link
							href="/create-page"
							className="bg-blue-600 text-white px-4 py-1 rounded-md">
							Create New Page
						</Link>
					</div>
					<div className="space-y-3">
						{pages.length > 0 ? (
							pages.map((page) => (
								<div
									key={page.slug}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
									<Link
										href={`/${page.slug}`}
										className="text-blue-600 hover:text-blue-800 font-medium">
										{page.slug}
									</Link>
									<span className="text-gray-500 text-sm">
										{page.components.length} components
									</span>
								</div>
							))
						) : (
							<p className="text-gray-500 italic">
								No pages created yet. Create your first page!
							</p>
						)}
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						API Usage
					</h2>
					<p className="text-gray-600 mb-4">
						POST https://page-builder-app-seven.vercel.app/api/pages - Create a
						new page
					</p>
					<pre className="bg-gray-900 text-gray-100 p-6 text-sm overflow-x-auto font-mono leading-relaxed">
						{`{
  "slug": "test-page",
  "components": [
    {"type": "TextSection", "props": {"text": "Welcome to my page!"}},
    {"type": "Card", "props": {"title": "Amazing Feature", "description": "This is incredible"}},
    {"type": "ImageBlock", "props": {"src": "https://bino.bot/_next/image?url=%2Flogo.png&w=256&q=75", "alt": "Bino Logo"}},
    {"type": "StatsBox", "props": {"label": "Users", "value": "1,024"}},
    {"type": "CTA", "props": {"message": "Ready to start?", "buttonText": "Get Started"}}
  ]
}`}
					</pre>
				</div>
			</div>
		</div>
	)
}
