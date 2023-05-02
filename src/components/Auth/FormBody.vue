<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, useForm } from 'vee-validate';
import type { z } from 'zod';
import { authSchemaRequest } from '~/schemas/auth';
import type { AuthModalType } from './AuthModal.vue';

type LoginFormData = z.infer<typeof authSchemaRequest.login>;

interface OptionBodyProps {
  authMethod: AuthModalType;
}
const props = defineProps<OptionBodyProps>();

interface OptionBodyEvents {
  (eventName: 'onSelect', option: AuthModalType): void;
}
const emit = defineEmits<OptionBodyEvents>();

const { handleSubmit, errors, isSubmitting, meta } = useForm<LoginFormData>({
  validationSchema: toTypedSchema(authSchemaRequest.login),
});

const isShow = ref(false);

const otherMethodAuthTitle = computed(() => {
  if (props.authMethod === 'login-phone') {
    return 'Log in with email';
  }
  if (props.authMethod === 'login-email') {
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
  <Form class="form-body" @submit.prevent="onSubmit">
    <div class="form-body-label">
      <label>Email or username</label>
      <ButtonBase
        variant="link"
        color="default"
        class="btn-link btn-redirect-login"
        @click="handleSelectOption(authMethod === 'login-phone' ? 'login-email' : 'login-phone')"
        >{{ otherMethodAuthTitle }}</ButtonBase
      >
    </div>
    <div class="form-body-group" :class="{ error: errors['usernameOrEmail'] }">
      <div class="form-body-field">
        <TextField name="usernameOrEmail" type="text" placeholder="Email or username" />
      </div>
      <ErrorMessage name="usernameOrEmail" class="error-message" />
    </div>
    <div class="form-body-group" :class="{ error: errors['password'] }">
      <div class="form-body-field">
        <TextField :type="isShow ? 'text' : 'password'" placeholder="Password" name="password" />
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
  </Form>
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
