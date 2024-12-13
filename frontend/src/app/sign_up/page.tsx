/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { SignUpForm } from './_components/SignUpForm';

const SignUpMutation = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...SignUp_User
      }
      validationErrors {
        ...SignUp_ValidationError
      }
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

const SignUpValidationErrorFragment = gql`
  fragment SignUp_ValidationError on SignUpValidationError {
    name
    email
    password
  }
`;

export default async function SignUpPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
