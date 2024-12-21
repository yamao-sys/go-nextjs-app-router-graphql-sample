'use server';

import { getClient } from '@/configs/apolloClient';
import {
  SignUpDocument,
  SignUpMutation,
  SignUpMutationVariables,
} from '../_components/SignUpForm/__generated__';

export const postSignUp = async (params: SignUpMutationVariables) => {
  const client = await getClient();

  const { data } = await client.mutate<SignUpMutation>({
    mutation: SignUpDocument,
    variables: {
      input: params.input,
    },
  });

  return data?.signUp;
};
