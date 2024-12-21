import * as SchemaTypes from '../../../../graphql/__generated__/graphql-schema-types';

import { gql } from '@apollo/client';
import { EditTodoForm_TodoFragmentDoc } from '../_components/EditTodoForm/__generated__/index';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchDoEditTodoQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID']['input'];
}>;

export type FetchDoEditTodoQuery = {
  __typename?: 'Query';
  fetchTodo: { __typename?: 'Todo'; id: string; title: string; content: string };
};

export const FetchDoEditTodoDocument = gql`
  query fetchDoEditTodo($id: ID!) {
    fetchTodo(id: $id) {
      ...EditTodoForm_Todo
    }
  }
  ${EditTodoForm_TodoFragmentDoc}
`;

/**
 * __useFetchDoEditTodoQuery__
 *
 * To run a query within a React component, call `useFetchDoEditTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDoEditTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDoEditTodoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchDoEditTodoQuery(
  baseOptions: Apollo.QueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables> &
    ({ variables: FetchDoEditTodoQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  );
}
export function useFetchDoEditTodoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  );
}
export function useFetchDoEditTodoSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<FetchDoEditTodoQuery, FetchDoEditTodoQueryVariables>(
    FetchDoEditTodoDocument,
    options,
  );
}
export type FetchDoEditTodoQueryHookResult = ReturnType<typeof useFetchDoEditTodoQuery>;
export type FetchDoEditTodoLazyQueryHookResult = ReturnType<typeof useFetchDoEditTodoLazyQuery>;
export type FetchDoEditTodoSuspenseQueryHookResult = ReturnType<
  typeof useFetchDoEditTodoSuspenseQuery
>;
export type FetchDoEditTodoQueryResult = Apollo.QueryResult<
  FetchDoEditTodoQuery,
  FetchDoEditTodoQueryVariables
>;
