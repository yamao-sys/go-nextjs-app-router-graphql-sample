'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SignInInput } from '@/graphql/__generated__/graphql-schema-types';
import { FC, useState } from 'react';
import { postSignIn } from '../../_actions';
import { BoxInputForm } from '@/components/molucules/BoxInputForm';
import { ValidationErrorMessages } from '@/components/molucules/ValidationErrorMessages';
import { SubmitButton } from '@/components/molucules/SubmitButton';
import { redirect } from 'next/navigation';
import { gql } from '@apollo/client';
import { SignInMutation } from './__generated__';

gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      validationError
    }
  }
`;

const INITIAL_SIGN_IN_INPUT = {
  email: '',
  password: '',
};

export const SignInForm: FC = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>(INITIAL_SIGN_IN_INPUT);

  const updateSignInInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInInput({
      ...signInInput,
      ...{ [e.target.name]: e.target.value },
    });
  };

  const [validationError, setValidationError] =
    useState<SignInMutation['signIn']['validationError']>('');

  const handleSignIn = async () => {
    const res = await postSignIn({ input: signInInput });

    setValidationError(res?.validationError ?? '');

    if (!res?.validationError) {
      window.alert('ログインしました！');
      redirect('/');
    }
  };

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>ログインフォーム</h3>

        <ValidationErrorMessages messages={validationError ? [validationError] : []} />

        <BoxInputForm
          labelId='email'
          labelText='Email'
          name='email'
          value={signInInput.email}
          onChange={updateSignInInput}
          validationErrorMessages={[]}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='password'
          labelText='パスワード'
          name='password'
          type='password'
          value={signInInput.password}
          onChange={updateSignInInput}
          validationErrorMessages={[]}
          needsMargin={true}
        />

        <SubmitButton labelText='ログインする' color='green' onClick={handleSignIn} />
      </div>
    </div>
  );
};
