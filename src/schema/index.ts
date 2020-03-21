import { gql } from "apollo-server-express";
import noteSchema from "./note";
import customSchema from "./custom";

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subsciption {
        _: Boolean
    }
`;

export default [linkSchema, noteSchema, customSchema];
