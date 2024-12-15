/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { SignInForm } from './_components/SignInForm';

const SignInMutation = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      validationError
    }
  }
`;

export default async function SignUpPage() {
  return (
    <>
      <SignInForm />
    </>
  );
}
