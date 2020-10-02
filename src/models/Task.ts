import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  decription: {
    type: String,
  },
  priority: { type: String, required: true },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
