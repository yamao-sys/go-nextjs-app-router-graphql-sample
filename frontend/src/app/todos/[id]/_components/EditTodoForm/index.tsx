'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { gql } from '@apollo/client';
import { FC, useState } from 'react';
import { EditTodoForm_TodoFragment, EditTodoForm_ValidationErrorFragment } from './__generated__';
import { UpdateTodoInput } from '@/graphql/__generated__/graphql-schema-types';
import { updateTodo } from '@/app/todos/_actions/todo';
import { redirect } from 'next/navigation';
import { BoxInputForm } from '@/components/molucules/BoxInputForm';
import { SubmitButton } from '@/components/molucules/SubmitButton';

gql`
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      validationErrors {
        ...EditTodoForm_ValidationError
      }
    }
  }
`;

gql`
  fragment EditTodoForm_Todo on Todo {
    id
    title
    content
  }
`;

gql`
  fragment EditTodoForm_ValidationError on UpdateTodoValidationError {
    title
    content
  }
`;

type Props = {
  todo: EditTodoForm_TodoFragment;
};

export const EditTodoForm: FC<Props> = ({ todo }: Props) => {
  const id = todo.id;
  const [todoInput, setTodoInput] = useState<UpdateTodoInput>({
    title: todo.title,
    content: todo.content,
  });

  const updateTodoInput = (params: Partial<UpdateTodoInput>) => {
    setTodoInput({ ...todoInput, ...params });
  };

  const [validationErrors, setValidationErrors] = useState<EditTodoForm_ValidationErrorFragment>({
    __typename: 'UpdateTodoValidationError',
    title: [],
    content: [],
  });

  const handleUpdateTodo = async () => {
    const res = await updateTodo(id, todoInput);
    setValidationErrors(res.validationErrors);

    if (res.id) {
      window.alert('Todoの更新に成功しました!');
      redirect('/todos');
    }
  };

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>Todo更新</h3>

        <BoxInputForm
          labelId='title'
          labelText='タイトル'
          name='title'
          value={todoInput.title}
          onChange={(e) => updateTodoInput({ title: e.target.value })}
          validationErrorMessages={validationErrors.title}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='content'
          labelText='内容'
          name='content'
          value={todoInput.content}
          onChange={(e) => updateTodoInput({ content: e.target.value })}
          validationErrorMessages={validationErrors.content}
          needsMargin={true}
        />

        <SubmitButton labelText='保存する' color='green' onClick={handleUpdateTodo} />
      </div>
    </div>
  );
};
