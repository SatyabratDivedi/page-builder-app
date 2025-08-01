import { connectDB } from './mongodb';
import { PageModel } from './models/Page';

export type Page = {
  slug: string;
  components: { type: string; props: any }[];
};

export async function getPage(slug: string): Promise<Page | null> {
  try {
    await connectDB();
    const page = await PageModel.findOne({ slug });
    return page ? { slug: (page as any).slug, components: (page as any).components } : null;
  } catch (error) {
    console.error('Error reading from MongoDB:', error);
    return null;
  }
}

export async function getAllPages(): Promise<Page[]> {
  try {
    await connectDB();
    const pages = await PageModel.find({});
    console.log('Fetched pages:', pages);
    return pages.map((page: any) => ({ slug: page.slug, components: page.components }));
  } catch (error) {
    console.error('Error reading from MongoDB:', error);
    return [];
  }
}
