import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { PageModel } from "@/lib/models/Page";

export type Page = {
  slug: string;
  components: { type: string; props: any }[];
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.slug || !Array.isArray(body.components)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const safeSlug = body.slug.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    try {
      await PageModel.findOneAndUpdate(
        { slug: safeSlug },
        { slug: safeSlug, components: body.components },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
      throw error;
    }

    return NextResponse.json({
      message: "Page created successfully",
      slug: safeSlug,
      url: `https://page-builder-app-seven.vercel.app/${safeSlug}`,
    });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    let pages = await PageModel.find({}).lean();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}