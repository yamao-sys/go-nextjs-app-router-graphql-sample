'use server';

import { getClient } from '@/configs/apolloClient';
import { SignInMutation, SignInDocument, SignInMutationVariables } from '../__generated__/page';
import { cookies } from 'next/headers';

export const postSignIn = async (params: SignInMutationVariables) => {
  const client = await getClient();

  const { data } = await client.mutate<SignInMutation>({
    mutation: SignInDocument,
    variables: {
      input: params.input,
    },
  });

  // const token = response.headers['set-cookie'].split(';')[0].split('=')[1];
  const c = await cookies();
  c.set('token', 'token', { secure: true, sameSite: 'none' });

  return data?.signIn;
};
