import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  comments: Array<Schema.Types.ObjectId>;
  description?: string;
  priority?: string;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
  },
  priority: { type: String },
  project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
