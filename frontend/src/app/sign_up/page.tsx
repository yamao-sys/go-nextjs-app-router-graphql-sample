/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { SignUpForm } from './_components/SignUpForm';

const SignUpMutation = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      ...SignUp_User
    }
  }
`;

const SignUpFragment = gql`
  fragment SignUp_User on User {
    id
    name
    email
  }
`;

export default async function SignUpPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
