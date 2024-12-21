import * as SchemaTypes from '../../../../../../graphql/__generated__/graphql-schema-types';

import { gql } from '@apollo/client';
export type TodosList_TodoFragment = {
  __typename?: 'Todo';
  id: string;
  title: string;
  createdAt: any;
  updatedAt: any;
};

export const TodosList_TodoFragmentDoc = gql`
  fragment TodosList_Todo on Todo {
    id
    title
    createdAt
    updatedAt
  }
`;
