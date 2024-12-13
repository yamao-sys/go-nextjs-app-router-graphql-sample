'use client';

import { FC, useState } from 'react';
import { SignUpInput } from '@/graphql/__generated__/graphql-schema-types';
import { BoxInputForm } from '@/components/molucules/BoxInputForm';
import { SubmitButton } from '@/components/molucules/SubmitButton';
import { postSignUp } from '../../_actions';

// const INITIAL_VALIDATION_ERRORS = {
//   name: [],
//   email: [],
//   password: [],
// };

export const SignUpForm: FC = () => {
  const [signUpInput, setSignInput] = useState<SignUpInput>({
    name: '',
    email: '',
    password: '',
  });

  const updateSignUpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInput({
      ...signUpInput,
      ...{ [e.target.name]: e.target.value },
    });
  };

  // const [validationErrors, setValidationErrors] =
  //   useState<>(INITIAL_VALIDATION_ERRORS);
  const handleValidateSignUp = async () => {
    const res = await postSignUp({ input: signUpInput });
    console.log(res);
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
          validationErrorMessages={[]}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='email'
          labelText='Email'
          name='email'
          value={signUpInput.email}
          onChange={updateSignUpInput}
          validationErrorMessages={[]}
          needsMargin={true}
        />

        <BoxInputForm
          labelId='password'
          labelText='パスワード'
          name='password'
          type='password'
          value={signUpInput.password}
          onChange={updateSignUpInput}
          validationErrorMessages={[]}
          needsMargin={true}
        />

        <SubmitButton labelText='確認画面へ' color='green' onClick={handleValidateSignUp} />
      </div>
    </div>
  );
};
