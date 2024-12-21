'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { gql } from '@apollo/client';
import { FC } from 'react';
import { TodosList_TodoFragment } from './__generated__';
import { BaseButton } from '@/components/atoms/BaseButton';
import { useRouter } from 'next/navigation';

gql`
  fragment TodosList_Todo on Todo {
    id
    title
    createdAt
    updatedAt
  }
`;

type Props = {
  todos: Array<TodosList_TodoFragment>;
};

export const TodosList: FC<Props> = ({ todos }: Props) => {
  const router = useRouter();

  const handleRouteToEditPage = (id: string) => router.push(`/todos/${id}`);

  return (
    <>
      {!todos.length ? (
        <div className='text-center'>まだ登録済みTodoが0件です。</div>
      ) : (
        todos.map((todo) => {
          return (
            <div key={todo.title} className='[&:not(:first-child)]:mt-8 border-2 border-gray-900'>
              <div className='p-2 flex justify-between'>
                <div className='sm:w-1/2 lg:w-3/5 text-lg md:text-3xl break-words'>
                  {todo.title}
                </div>
                <div className='sm:w-1/2 lg:w-2/5 flex justify-around'>
                  <BaseButton
                    labelText='編集する'
                    color='green'
                    additionalStyle='text-xs lg:text-sm'
                    onClick={() => handleRouteToEditPage(todo.id)}
                  />
                  <BaseButton
                    labelText='削除する'
                    color='red'
                    additionalStyle='ml-4 text-xs lg:text-sm'
                    // onClick={() => handleDeleteReadingRecord(readingRecord.id)}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
