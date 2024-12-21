'use server';

import { getClient } from '@/configs/apolloClient';
import {
  FetchTodoListsDocument,
  FetchTodoListsQuery,
} from '../_components/Todos/TodosTemplate/__generated__';
import { TodosList_TodoFragment } from '../_components/Todos/TodosList/__generated__';
import { CreateTodoInput } from '@/graphql/__generated__/graphql-schema-types';
import {
  CreateTodoDocument,
  CreateTodoMutation,
} from '../new/_components/NewTodosForm/__generated__';

export const fetchTodoLists = async (): Promise<Array<TodosList_TodoFragment>> => {
  const client = await getClient();

  const { data } = await client.query<FetchTodoListsQuery>({
    query: FetchTodoListsDocument,
  });

  return data.fetchTodoLists;
};

export const createTodo = async (
  input: CreateTodoInput,
): Promise<CreateTodoMutation['createTodo']> => {
  const client = await getClient();

  const { data } = await client.mutate<CreateTodoMutation>({
    mutation: CreateTodoDocument,
    variables: {
      input,
    },
  });
  if (!data) {
    throw new Error();
  }

  return data.createTodo;
};
