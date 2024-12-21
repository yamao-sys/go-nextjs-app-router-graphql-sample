import { gql } from '@apollo/client';
import { EditTodoTemplate } from './_components/EditTodoTemplate';

/* eslint-disable @typescript-eslint/no-unused-expressions */
gql`
  query fetchDoEditTodo($id: ID!) {
    fetchTodo(id: $id) {
      ...EditTodoForm_Todo
    }
  }
`;

type EditTodoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  return (
    <>
      <EditTodoTemplate id={id} />
    </>
  );
}
