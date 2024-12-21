import { fetchDoEditTodo } from '@/app/todos/_actions/todo';
import { FC } from 'react';
import { EditTodoForm } from '../EditTodoForm';

type Props = {
  id: string;
};

export const EditTodoTemplate: FC<Props> = async ({ id }: Props) => {
  const todo = await fetchDoEditTodo(id);
  return (
    <>
      <EditTodoForm todo={todo} />
    </>
  );
};
