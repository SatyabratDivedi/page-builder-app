import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  components: [{
    type: { type: String, required: true },
    props: { type: mongoose.Schema.Types.Mixed, required: true }
  }]
}, { timestamps: true });

export const PageModel = mongoose.models.Page || mongoose.model('Page', PageSchema);
