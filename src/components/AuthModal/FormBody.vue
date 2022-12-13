<script lang="ts" setup>
import { toFormValidator } from '@vee-validate/zod';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import type { z } from 'zod';
import { loginSchema } from '~/schemas/auth';
import ButtonBase from '../ButtonBase.vue';
import IconBase from '../IconBase.vue';

type UsernameOrEmailField = z.infer<typeof loginSchema>['usernameOrEmail'];
type PasswordField = z.infer<typeof loginSchema>['password'];

const loginValidationSchema = toFormValidator(loginSchema);
const { handleSubmit, errors, isSubmitting, meta } = useForm({
  validationSchema: loginValidationSchema,
});

const { value: usernameOrEmail } = useField<UsernameOrEmailField>('usernameOrEmail', undefined, {});
const { value: password } = useField<PasswordField>('password', undefined, {});

const isShow = ref(false);

const handleTogglePassword = () => {
  isShow.value = !isShow.value;
};

const onSubmit = handleSubmit((values) => {
  if (isSubmitting) {
    console.log('submitting');
  }
  console.log(values);
});
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="login-form-label">
      <label>Email or username</label>
      <a href="#">Log in with phone</a>
    </div>
    <div class="login-form-group" :class="{ error: errors['usernameOrEmail'] }">
      <div class="login-form-field">
        <input
          v-model="usernameOrEmail"
          type="text"
          placeholder="Email or username"
          class="login-form"
        />
      </div>
      <ErrorMessage name="usernameOrEmail" class="error-message" />
    </div>
    <div class="login-form-group" :class="{ error: errors['password'] }">
      <div class="login-form-field">
        <input v-model="password" type="password" placeholder="Password" />
        <div class="login-form-toggle" @click="handleTogglePassword">
          <IconBase v-if="isShow" name="eye" stroke="white" />
          <IconBase v-else name="eye-slash" stroke="white" />
        </div>
      </div>
      <ErrorMessage name="password" class="error-message" />
    </div>
    <div class="login-form-label">
      <a href="#">Forgot password?</a>
    </div>
    <ButtonBase
      variant="solid"
      :color="meta.valid ? 'danger' : 'default'"
      type="submit"
      class="login-form-btn"
      expanded
      :disabled="isSubmitting || !meta.valid"
      >Login</ButtonBase
    >
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  padding: 0 1.5rem;
  &-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    label {
      font-size: 1.5rem;
      font-weight: 600;
    }
    a {
      font-size: 1.2rem;
      color: rgba(22, 24, 35, 0.75);
      font-weight: 600;
      display: inline-block;
    }
  }
  &-group {
    margin-bottom: 10px;
    &.error {
      .login-form-field {
        input {
          border-color: $danger;
        }
      }
      .error-message {
        color: $danger;
        font-size: 1.4rem;
        margin-top: 5px;
      }
    }
  }
  &-field {
    display: flex;
    align-items: center;
    position: relative;
    input {
      padding: 1.5rem 1rem;
      border-radius: 4px;
      color: inherit;
      flex-grow: 1;
      font-size: 1.6rem;
      height: 100%;
      background-color: rgba(22, 24, 35, 0.06);
      border: 1px solid rgba(22, 24, 35, 0.12);
    }
  }
  &-toggle {
    position: absolute;
    right: 1rem;
    cursor: pointer;
  }
  &-btn {
    min-width: 120px;
    min-height: 46px;
    font-weight: 700;
    user-select: none;
    margin-top: 1.8rem;
  }
}
</style>
