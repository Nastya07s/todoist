import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
