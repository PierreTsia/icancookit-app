import * as mongoose from "mongoose";

export interface NoteDocument extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
}

const schema: mongoose.SchemaDefinition = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
};

const collectionName: string = "note";
const noteSchema: mongoose.Schema = new mongoose.Schema(schema);

const Note: mongoose.Model<NoteDocument> = mongoose.model(
  collectionName,
  noteSchema
);

export default Note;
