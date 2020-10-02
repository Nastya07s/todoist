import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }, 
  ],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
