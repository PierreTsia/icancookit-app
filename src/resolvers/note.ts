import { NoteDocument } from './../models/note';
import { ApolloError } from 'apollo-server-express';
import * as mongoose from 'mongoose';
import dayjs from 'dayjs';

export default {
  Query: {
    getAllNotes: async (
      _: any,
      args: void,
      { Note }: { Note: mongoose.Model<NoteDocument> }
    ): Promise<NoteDocument[]> => {
      let notes: NoteDocument[] = [];
      try {
        notes = await Note.find().exec();
      } catch (e) {
        console.log(e);
        throw new ApolloError('Error retrieving all notes');
      }

      return notes;
    },
    getNote: async () => {
      return '';
    },
  },

  Mutation: {
    saveNote: async (
      _: any,
      { title, content }: { title: NoteDocument['title']; content: NoteDocument['content'] },
      { Note }: { Note: mongoose.Model<NoteDocument> }
    ): Promise<NoteDocument> => {
      try {
        const note = await Note.create({ title, content, date: dayjs().toDate() });
        return note;
      } catch (e) {
        console.log(e);
        throw new ApolloError('Error retrieving all notes');
      }
    },
  },
};
