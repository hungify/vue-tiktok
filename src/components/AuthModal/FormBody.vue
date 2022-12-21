<script lang="ts" setup>
import { toFormValidator } from '@vee-validate/zod';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import { ref, computed } from 'vue';
import type { z } from 'zod';
import { loginSchema } from '~/schemas/auth';
import ButtonBase from '../ButtonBase.vue';
import IconBase from '../IconBase.vue';
import type { AuthModalType } from './AuthModal.vue';

type UsernameOrEmailField = z.infer<typeof loginSchema>['usernameOrEmail'];
type PasswordField = z.infer<typeof loginSchema>['password'];

interface OptionBodyProps {
  methodAuth: AuthModalType;
}
const props = defineProps<OptionBodyProps>();

interface OptionBodyEvents {
  (eventName: 'onSelect', option: AuthModalType): void;
}
const emit = defineEmits<OptionBodyEvents>();

const loginValidationSchema = toFormValidator(loginSchema);
const { handleSubmit, errors, isSubmitting, meta } = useForm({
  validationSchema: loginValidationSchema,
});

const { value: usernameOrEmail } = useField<UsernameOrEmailField>('usernameOrEmail', undefined, {});
const { value: password } = useField<PasswordField>('password', undefined, {});

const isShow = ref(false);

const otherMethodAuthTitle = computed(() => {
  if (props.methodAuth === 'login-phone') {
    return 'Log in with email';
  }
  if (props.methodAuth === 'login-email') {
    return 'Log in with phone';
  }
  return 'Log in with email';
});

const handleTogglePassword = () => {
  isShow.value = !isShow.value;
};

const onSubmit = handleSubmit((values) => {
  if (isSubmitting) {
    console.log('submitting');
  }
  console.log(values);
});

const handleSelectOption = (option: AuthModalType) => {
  emit('onSelect', option);
};
</script>

<template>
  <form class="form-body" @submit.prevent="onSubmit">
    <div class="form-body-label">
      <label>Email or username</label>
      <ButtonBase
        variant="link"
        color="default"
        class="btn-link btn-redirect-login"
        @click="handleSelectOption(methodAuth === 'login-phone' ? 'login-email' : 'login-phone')"
        >{{ otherMethodAuthTitle }}</ButtonBase
      >
    </div>
    <div class="form-body-group" :class="{ error: errors['usernameOrEmail'] }">
      <div class="form-body-field">
        <input
          v-model="usernameOrEmail"
          type="text"
          placeholder="Email or username"
          class="form-body"
        />
      </div>
      <ErrorMessage name="usernameOrEmail" class="error-message" />
    </div>
    <div class="form-body-group" :class="{ error: errors['password'] }">
      <div class="form-body-field">
        <input v-model="password" type="password" placeholder="Password" />
        <div class="form-body-toggle" @click="handleTogglePassword">
          <IconBase v-if="isShow" name="eye" stroke="white" />
          <IconBase v-else name="eye-slash" stroke="white" />
        </div>
      </div>
      <ErrorMessage name="password" class="error-message" />
    </div>
    <div class="form-body-label">
      <ButtonBase
        variant="link"
        color="default"
        class="btn-link"
        @click="handleSelectOption('forgot-password')"
        >Forgot password?</ButtonBase
      >
    </div>
    <ButtonBase
      variant="solid"
      :color="meta.valid ? 'danger' : 'default'"
      type="submit"
      class="form-body-btn"
      expanded
      :disabled="isSubmitting || !meta.valid"
      >Login</ButtonBase
    >
  </form>
</template>

<style lang="scss" scoped>
.form-body {
  padding: 0 1.5rem;
  &-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    label {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .btn-link {
      padding: 0;
    }
    .btn-redirect-login {
      font-size: 1.2rem;
      color: rgba($text, 0.75);
      font-weight: 600;
      display: inline-block;
    }
  }
  &-group {
    margin-bottom: 10px;
    &.error {
      .form-body-field {
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
