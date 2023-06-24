import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  EmailAddress: any;
  Time: any;
  URL: any;
  UUID: any;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  autoLogin: Token;
  changeEmail: Message;
  changeEmailRequest: Message;
  changePassword: Message;
  forgotPassword: Message;
  login: Token;
  register: Message;
  resetPassword: Message;
  sendVerificationEmail: Message;
  verifyEmail: Message;
};


export type MutationAutoLoginArgs = {
  userId: Scalars['String'];
};


export type MutationChangeEmailArgs = {
  token: Scalars['String'];
};


export type MutationChangeEmailRequestArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hi: Scalars['String'];
  me?: Maybe<User>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', accessToken: string } };

export type ChangeEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'Message', message: string } };

export type ChangeEmailRequestMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangeEmailRequestMutation = { __typename?: 'Mutation', changeEmailRequest: { __typename?: 'Message', message: string } };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'Message', message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'Message', message: string } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Message', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Message', message: string } };

export type SendVerificationEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendVerificationEmailMutation = { __typename?: 'Mutation', sendVerificationEmail: { __typename?: 'Message', message: string } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'Message', message: string } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', hi: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, fullName: string, email: string, role: Role, password: string } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($token: String!) {
  changeEmail(token: $token) {
    message
  }
}
    `;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangeEmailMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useChangeEmailMutation(options: VueApolloComposable.UseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
}
export type ChangeEmailMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeEmailRequestDocument = gql`
    mutation ChangeEmailRequest($email: String!) {
  changeEmailRequest(email: $email) {
    message
  }
}
    `;

/**
 * __useChangeEmailRequestMutation__
 *
 * To run a mutation, you first call `useChangeEmailRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangeEmailRequestMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useChangeEmailRequestMutation(options: VueApolloComposable.UseMutationOptions<ChangeEmailRequestMutation, ChangeEmailRequestMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ChangeEmailRequestMutation, ChangeEmailRequestMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ChangeEmailRequestMutation, ChangeEmailRequestMutationVariables>(ChangeEmailRequestDocument, options);
}
export type ChangeEmailRequestMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ChangeEmailRequestMutation, ChangeEmailRequestMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    message
  }
}
    `;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useChangePasswordMutation({
 *   variables: {
 *     oldPassword: // value for 'oldPassword'
 *     newPassword: // value for 'newPassword'
 *     confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(options: VueApolloComposable.UseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    message
  }
}
    `;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useForgotPasswordMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(options: VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $fullName: String!) {
  register(email: $email, password: $password, fullName: $fullName) {
    message
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *     fullName: // value for 'fullName'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!, $confirmPassword: String!) {
  resetPassword(
    token: $token
    password: $password
    confirmPassword: $confirmPassword
  ) {
    message
  }
}
    `;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordMutation({
 *   variables: {
 *     token: // value for 'token'
 *     password: // value for 'password'
 *     confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendVerificationEmailDocument = gql`
    mutation SendVerificationEmail($email: String!) {
  sendVerificationEmail(email: $email) {
    message
  }
}
    `;

/**
 * __useSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useSendVerificationEmailMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationEmailMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSendVerificationEmailMutation({
 *   variables: {
 *     email: // value for 'email'
 *   },
 * });
 */
export function useSendVerificationEmailMutation(options: VueApolloComposable.UseMutationOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>(SendVerificationEmailDocument, options);
}
export type SendVerificationEmailMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    message
  }
}
    `;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVerifyEmailMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(options: VueApolloComposable.UseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
}
export type VerifyEmailMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const QueryDocument = gql`
    query Query {
  hi
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a Vue component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useQueryQuery();
 */
export function useQueryQuery(options: VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, {}, options);
}
export function useQueryLazyQuery(options: VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<QueryQuery, QueryQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, {}, options);
}
export type QueryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<QueryQuery, QueryQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    fullName
    email
    role
    password
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;