"use client"
import React, { useState } from "react"

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

type PageProps = {
	slug: string
	components: Components[]
}

const Page = () => {
	const [slug, setSlug] = useState("")
	const [component, setComponent] = useState<Components[]>([
		{ type: "TextSection", props: { text: "" } },
	])
	const allComp = [
		{ type: "TextSection", props: { text: "" } },
		{ type: "Card", props: { title: "", description: "" } },
		{ type: "ImageBlock", props: { src: "", alt: "" } },
		{ type: "StatsBox", props: { label: "", value: "" } },
		{ type: "CTA", props: { message: "", buttonText: "" } },
	]

	const optionChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		setComponent((prev: Components[]) => {
			return prev.map((item, i) => {
				if (index !== i) return item
				return {
					type: e.target.value,
					props: allComp.find((comp) => comp.type === e.target.value)?.props,
				}
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
		try {
			const res = await fetch("/api/pages", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slug, components: component }),
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
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					Create Page with Components
				</h1>
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Page Slug
					</label>
					<input
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						type="text"
						placeholder="Enter page slug (e.g., about-us)"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
					/>
				</div>
				{component.map((comp, index) => {
					return (
						<div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<h3 className="text-lg font-semibold text-gray-700">
										Component {index + 1}
									</h3>
									<button
										onClick={() => handleDeleteComponent(index)}
										className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-1 rounded ">
										Delete
									</button>
								</div>
								<select
									onChange={(e) => optionChange(e, index)}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
									value={comp.type}>
									{allComp.map((comp) => (
										<option key={comp.type} value={comp.type}>
											{comp.type}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-4">
								{comp.type == "TextSection" && (
									<input
										onChange={(e) => updateText(index, "text", e.target.value)}
										type="text"
										placeholder="Text"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
									/>
								)}
								{comp.type == "Card" && (
									<div className="space-y-3">
										<input
											onChange={(e) =>
												updateText(index, "title", e.target.value)
											}
											type="text"
											placeholder="Title"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
										<input
											onChange={(e) =>
												updateText(index, "description", e.target.value)
											}
											type="text"
											placeholder="Description"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
									</div>
								)}
								{comp.type == "ImageBlock" && (
									<div className="space-y-3">
										<input
											onChange={(e) => updateText(index, "alt", e.target.value)}
											type="text"
											placeholder="Alt Text"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
										<input
											onChange={(e) => updateText(index, "src", e.target.value)}
											type="text"
											placeholder="Image URL"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
									</div>
								)}
								{comp.type == "StatsBox" && (
									<div className="space-y-3">
										<input
											onChange={(e) =>
												updateText(index, "label", e.target.value)
											}
											type="text"
											placeholder="Label"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
										<input
											onChange={(e) =>
												updateText(index, "value", e.target.value)
											}
											type="text"
											placeholder="Value"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
									</div>
								)}
								{comp.type == "CTA" && (
									<div className="space-y-3">
										<input
											onChange={(e) =>
												updateText(index, "message", e.target.value)
											}
											type="text"
											placeholder="Message"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
										<input
											onChange={(e) =>
												updateText(index, "buttonText", e.target.value)
											}
											type="text"
											placeholder="Button Text"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
										/>
									</div>
								)}
							</div>
						</div>
					)
				})}

				<div className="flex gap-4 mt-8">
					<button
						onClick={handleAddComponent}
						className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
						Add Component
					</button>
					<button
						onClick={handleSaveDetails}
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
						Save Details
					</button>
				</div>
			</div>
		</div>
	)
}

export default Page
