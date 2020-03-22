import dayjs from 'dayjs';
import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import { NoteDocument } from './../models/note';
import { Ctx } from './types';

export default {
  Query: {
    getAllNotes: async (_: any, args: void, { currentUser, Note }: Ctx): Promise<NoteDocument[]> => {
      if (!currentUser) {
        throw new ApolloError('Authentication required');
      }
      let notes: NoteDocument[] = [];
      try {
        notes = await Note.find().exec();
      } catch (e) {
        throw new ApolloError(e || 'Error retrieving all notes');
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
        throw new ApolloError(e || 'Error retrieving all notes');
      }
    },
  },
};
