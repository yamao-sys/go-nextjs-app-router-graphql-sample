'use client';

import { FC, useState } from 'react';
import { SignUpInput } from '@/graphql/__generated__/graphql-schema-types';
import { BoxInputForm } from '@/components/molucules/BoxInputForm';
import { SubmitButton } from '@/components/molucules/SubmitButton';
import { postSignUp } from '../../_actions';
import { SignUp_ValidationErrorFragment } from '../../__generated__/page';

const INITIAL_SIGN_UP_INPUT = {
  name: '',
  email: '',
  password: '',
};

export const SignUpForm: FC = () => {
  const [signUpInput, setSignInput] = useState<SignUpInput>(INITIAL_SIGN_UP_INPUT);

  const updateSignUpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInput({
      ...signUpInput,
      ...{ [e.target.name]: e.target.value },
    });
  };

  const [validationErrors, setValidationErrors] = useState<SignUp_ValidationErrorFragment>();
  const handleValidateSignUp = async () => {
    const res = await postSignUp({ input: signUpInput });

    setValidationErrors(res?.validationErrors);

    if (res?.user?.id) {
      window.alert('ユーザの登録に成功しました！');
      setSignInput(INITIAL_SIGN_UP_INPUT);
    }
  };

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-3/5 mx-auto'>
        <h3 className='mt-16 w-full text-center text-2xl font-bold'>エンジニア登録フォーム</h3>

        <BoxInputForm
          labelId='name'
          labelText='ユーザ名'
          name='name'
          value={signUpInput.name}
          onChange={updateSignUpInput}
          validationErrorMessages={validationErrors?.name ?? []}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='email'
          labelText='Email'
          name='email'
          value={signUpInput.email}
          onChange={updateSignUpInput}
          validationErrorMessages={validationErrors?.email ?? []}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='password'
          labelText='パスワード'
          name='password'
          type='password'
          value={signUpInput.password}
          onChange={updateSignUpInput}
          validationErrorMessages={validationErrors?.password ?? []}
          needsMargin={true}
        />

        <SubmitButton labelText='登録する' color='green' onClick={handleValidateSignUp} />
      </div>
    </div>
  );
};
