"use client"
import React, { useState } from "react"
import Link from "next/link"

type TextSectionProps = {
	text: string
}
type CardProps = {
	title: string
	description: string
}
type ImageBlockProps = {
	src: string
	alt: string
}
type StatsBoxProps = {
	label: string
	value: string | number
}
type CTSProps = {
	message: string
	buttonText: string
}

type Components = {
	type: string
	props:
	| TextSectionProps
	| CardProps
	| ImageBlockProps
	| StatsBoxProps
	| CTSProps
}

const Page = () => {
	const [slug, setSlug] = useState("")
	const [component, setComponent] = useState<Components[]>([
		{ type: "TextSection", props: { text: "" } },
	])

	function createSlug(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "")
	}

	const allComp = [
		{ type: "TextSection", props: { text: "" } },
		{ type: "Card", props: { title: "", description: "" } },
		{ type: "ImageBlock", props: { src: "", alt: "" } },
		{ type: "StatsBox", props: { label: "", value: "" } },
		{ type: "CTA", props: { message: "", buttonText: "" } },
	]

	const optionChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
		setComponent((prev: Components[]) => {
			return prev.map((item, i) => {
				if (index !== i) return item
				return {
					type: e.target.value,
					props: allComp.find((comp) => comp.type === e.target.value)?.props,
				} as Components
			})
		})
	}

	const handleAddComponent = () => {
		setComponent([...component, { type: "TextSection", props: { text: "" } }])
	}

	const handleDeleteComponent = (index: number) => {
		setComponent((prev) => prev.filter((_, i) => i !== index))
	}

	const handleSaveDetails = async () => {
		if (slug.length == 0) {
			alert(`slug can't be empty`)
			return
		}
		if (component.length == 0) {
			alert(`please add atleast one component`)
			return
		}
		try {
			const res = await fetch("/api/pages", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slug: createSlug(slug), components: component }),
			})

			const data = await res.json()

			if (res.ok) {
				setTimeout(() => {
					window.location.href = `/${data.slug}`
				}, 1000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const updateText = (index: number, propKey: string, value: string) => {
		setComponent((prev: Components[]) =>
			prev.map((item, i) => {
				if (index !== i) return item
				return {
					...item,
					props: {
						...item.props,
						[propKey]: value,
					},
				}
			})
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b border-gray-200 w-full">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Link
								href="/"
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
								Back to Home
							</Link>
							<div className="h-6 w-px bg-gray-300"></div>
							<h1 className="text-2xl font-bold text-gray-900">Page Builder</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="space-y-6">
					{/* Slug Input */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<label className="block text-sm font-semibold text-gray-700 mb-3">
							📝 Page URL Slug
						</label>
						<div className="relative">
							<input
								value={slug}
								onChange={(e) => setSlug(e.target.value)}
								type="text"
								placeholder="Enter page slug (e.g., about-us)"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
							/>
							{slug && (
								<div className="mt-2 text-sm text-gray-600">
									Will be available at:{" "}
									<span className="font-mono bg-gray-100 px-2 py-1 rounded">
										/{createSlug(slug)}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Components */}
					{component.map((comp, index) => (
						<div
							key={index}
							className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm">
										{index + 1}
									</div>
									<h3 className="text-lg font-semibold text-gray-800">
										{comp.type}
									</h3>
								</div>
								<div className="flex items-center space-x-2">
									<select
										onChange={(e) => optionChange(e, index)}
										className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
										value={comp.type}>
										{allComp.map((comp) => (
											<option key={comp.type} value={comp.type}>
												{comp.type}
											</option>
										))}
									</select>
									<button
										onClick={() => handleDeleteComponent(index)}
										className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors duration-200">
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div className="space-y-4">
								{comp.type === "TextSection" && (
									<input
										onChange={(e) => updateText(index, "text", e.target.value)}
										type="text"
										placeholder="Enter your text here..."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
									/>
								)}
								{comp.type === "Card" && (
									<div className="space-y-3">
										<input
											onChange={(e) => updateText(index, "title", e.target.value)}
											type="text"
											placeholder="Card title..."
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
										<textarea
											onChange={(e) => updateText(index, "description", e.target.value)}
											placeholder="Card description..."
											rows={2}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
										/>
									</div>
								)}
								{comp.type === "ImageBlock" && (
									<div className="space-y-3">
										<input
											onChange={(e) => updateText(index, "src", e.target.value)}
											type="text"
											placeholder="Image URL (https://...)"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
										<input
											onChange={(e) => updateText(index, "alt", e.target.value)}
											type="text"
											placeholder="Alt for image..."
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
									</div>
								)}
								{comp.type === "StatsBox" && (
									<div className="grid grid-cols-2 gap-3">
										<input
											onChange={(e) => updateText(index, "label", e.target.value)}
											type="text"
											placeholder="Stat label..."
											className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
										<input
											onChange={(e) => updateText(index, "value", e.target.value)}
											type="text"
											placeholder="Stat value..."
											className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
									</div>
								)}
								{comp.type === "CTA" && (
									<div className="space-y-3">
										<input
											onChange={(e) => updateText(index, "message", e.target.value)}
											type="text"
											placeholder="Call to action message..."
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
										<input
											onChange={(e) => updateText(index, "buttonText", e.target.value)}
											type="text"
											placeholder="Button text..."
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
										/>
									</div>
								)}
							</div>
						</div>
					))}

					{/* Action Buttons */}
					<div className="flex justify-between items-center">
						<button
							onClick={handleAddComponent}
							className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							<span>Add Component</span>
						</button>
						<button
							onClick={handleSaveDetails}
							className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
								/>
							</svg>
							<span>Save & Publish</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
