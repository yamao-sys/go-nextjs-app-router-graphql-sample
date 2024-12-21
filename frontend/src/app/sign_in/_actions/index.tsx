'use server';

import { getClient } from '@/configs/apolloClient';
import {
  SignInDocument,
  SignInMutation,
  SignInMutationVariables,
} from '../_components/SignInForm/__generated__';

export const postSignIn = async (params: SignInMutationVariables) => {
  const client = await getClient();

  const { data } = await client.mutate<SignInMutation>({
    mutation: SignInDocument,
    variables: {
      input: params.input,
    },
  });

  return data?.signIn;
};
