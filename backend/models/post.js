//In the models is where we create the database fields
//
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [ String ],
	selectedFile: String,
	likeCount: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});
export default mongoose.model('post', postSchema);
