'use client';

import { createTodo } from '@/app/todos/_actions/todo';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { BoxInputForm } from '@/components/molucules/BoxInputForm';
import { SubmitButton } from '@/components/molucules/SubmitButton';
import { CreateTodoInput } from '@/graphql/__generated__/graphql-schema-types';
import { gql } from '@apollo/client';
import { FC, useState } from 'react';
import { CreateTodo_ValidationErrorFragment } from './__generated__';
import { redirect } from 'next/navigation';

gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      validationErrors {
        ...CreateTodo_ValidationError
      }
    }
  }
`;

gql`
  fragment CreateTodo_ValidationError on CreateTodoValidationError {
    title
    content
  }
`;

export const NewTodosForm: FC = () => {
  const [createTodoInput, setCreateTodoInput] = useState<CreateTodoInput>({
    content: '',
    title: '',
  });

  const updateCreateTodoInput = (params: Partial<CreateTodoInput>) => {
    setCreateTodoInput({ ...createTodoInput, ...params });
  };

  const [validationErrors, setValidationErrors] = useState<CreateTodo_ValidationErrorFragment>({
    __typename: 'CreateTodoValidationError',
    title: [],
    content: [],
  });

  const handleCreateTodo = async () => {
    const res = await createTodo(createTodoInput);
    setValidationErrors(res.validationErrors);

    if (res.id) {
      window.alert('Todoの作成に成功しました!');
      redirect('/todos');
    }
  };

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>Todo作成</h3>

        <BoxInputForm
          labelId='title'
          labelText='タイトル'
          name='title'
          value={createTodoInput.title}
          onChange={(e) => updateCreateTodoInput({ title: e.target.value })}
          validationErrorMessages={validationErrors.title}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='content'
          labelText='内容'
          name='content'
          value={createTodoInput.content}
          onChange={(e) => updateCreateTodoInput({ content: e.target.value })}
          validationErrorMessages={validationErrors.content}
          needsMargin={true}
        />

        <SubmitButton labelText='登録する' color='green' onClick={handleCreateTodo} />
      </div>
    </div>
  );
};
