/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fetchTodoLists } from '@/app/todos/_actions/todo';
import { gql } from '@apollo/client';
import { FC } from 'react';
import { TodosList } from '../TodosList';

gql`
  query fetchTodoLists {
    fetchTodoLists {
      ...TodosList_Todo
    }
  }
`;

export const TodosTemplate: FC = async () => {
  const todos = await fetchTodoLists();
  return (
    <div className='mt-16'>
      <TodosList todos={todos} />
    </div>
  );
};
