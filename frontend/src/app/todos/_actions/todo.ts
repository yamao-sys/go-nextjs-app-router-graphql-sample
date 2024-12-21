'use server';

import { getClient } from '@/configs/apolloClient';
import {
  FetchTodoListsDocument,
  FetchTodoListsQuery,
} from '../_components/Todos/TodosTemplate/__generated__';
import {
  DeleteTodoDocument,
  DeleteTodoMutation,
  TodosList_TodoFragment,
} from '../_components/Todos/TodosList/__generated__';
import { CreateTodoInput, UpdateTodoInput } from '@/graphql/__generated__/graphql-schema-types';
import {
  CreateTodoDocument,
  CreateTodoMutation,
} from '../new/_components/NewTodosForm/__generated__';
import {
  EditTodoForm_TodoFragment,
  UpdateTodoDocument,
  UpdateTodoMutation,
} from '../[id]/_components/EditTodoForm/__generated__';
import { FetchDoEditTodoDocument, FetchDoEditTodoQuery } from '../[id]/__generated__/page';

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

export const fetchDoEditTodo = async (id: string): Promise<EditTodoForm_TodoFragment> => {
  const client = await getClient();

  const { data } = await client.query<FetchDoEditTodoQuery>({
    query: FetchDoEditTodoDocument,
    variables: {
      id,
    },
  });

  return data.fetchTodo;
};

export const updateTodo = async (
  id: string,
  input: UpdateTodoInput,
): Promise<UpdateTodoMutation['updateTodo']> => {
  const client = await getClient();

  const { data } = await client.mutate<UpdateTodoMutation>({
    mutation: UpdateTodoDocument,
    variables: {
      id,
      input,
    },
  });
  if (!data) {
    throw new Error();
  }

  return data.updateTodo;
};

export const deleteTodo = async (id: string): Promise<DeleteTodoMutation['deleteTodo']> => {
  const client = await getClient();

  const { data } = await client.mutate<DeleteTodoMutation>({
    mutation: DeleteTodoDocument,
    variables: {
      id,
    },
  });
  if (!data) {
    throw new Error();
  }

  return data.deleteTodo;
};
