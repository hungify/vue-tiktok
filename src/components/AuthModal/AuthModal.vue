<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { ObjectKeys } from '~/utils/object';
import ButtonBase from '../ButtonBase.vue';
import IconBase from '../IconBase.vue';
import ModalBase from '../ModalBase.vue';
import FormBody from './FormBody.vue';
import OptionBody from './OptionBody.vue';
import QrBody from './QrBody.vue';

export type AuthModalType =
  | 'qr'
  | 'login-email'
  | 'login-phone'
  | 'signup'
  | 'forgot-password'
  | 'option';

interface AuthModalProps {
  modelValue: boolean;
}
const props = defineProps<AuthModalProps>();

interface AuthModalEvents {
  (eventName: 'update:modelValue', event: boolean): void;
}
const emits = defineEmits<AuthModalEvents>();

const isShowModal = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});

const methodAuth = ref<AuthModalType>('option');

const modalTile = reactive({
  'login-phone': 'Log in for TikTok',
  'login-email': 'Log in for TikTok',
  signup: 'Sign up for TikTok',
  'forgot-password': 'Forgot password',
  qr: 'Log in with QR code',
  option: 'Log in to TikTok',
});

const isMethodAuthForm = computed(() => {
  return ObjectKeys(modalTile)
    .filter((key) => key !== 'option')
    .includes(methodAuth.value);
});

const currentModalBody = computed(() => {
  if (methodAuth.value === 'qr') {
    return QrBody;
  }
  if (isMethodAuthForm.value) {
    return FormBody;
  }
  return OptionBody;
});

const currentModalTitle = computed(() => {
  return modalTile[methodAuth.value];
});

const handleSelectOption = (option: AuthModalType) => {
  methodAuth.value = option;
};
const handleBack = () => {
  methodAuth.value = 'option';
};
</script>

<template>
  <ModalBase
    v-model="isShowModal"
    size="lg"
    scrollBehavior="inside"
    footerClass="auth-footer"
    headerClass="auth-header"
    bodyClass="auth-body"
  >
    <template v-if="methodAuth !== 'option'" #header>
      <ButtonBase
        variant="ghost"
        color="default"
        size="xs"
        rounded
        class="btn-back"
        @click="handleBack"
      >
        <IconBase name="chevron-left" />
      </ButtonBase>
    </template>
    <template #default>
      <h1 class="title">{{ currentModalTitle }}</h1>
      <component
        :is="currentModalBody"
        v-bind="currentModalBody === FormBody ? { methodAuth } : {}"
        @onSelect="handleSelectOption"
      />
    </template>
    <template #footer>
      <div class="auth-footer-inner">
        Don’t have an account?
        <ButtonBase
          variant="link"
          color="danger"
          class="btn-link"
          @click="handleSelectOption('signup')"
          >Sign up</ButtonBase
        >
      </div>
    </template>
  </ModalBase>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: pxToRem(70px);
  font-size: 3.2rem;
}
.btn-back {
  width: 4rem;
  height: 4rem;
}

:global(.auth-header) {
  padding: pxToRem(44px) 1rem !important;
}

:global(.auth-body) {
  padding: 0 pxToRem(80px) !important;
  min-height: 494px;
}

:global(.auth-footer) {
  padding: pxToRem(32px) 0 !important;
  border-top: 1px solid rgba(22, 24, 35, 0.12);
}

.auth-footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  span {
    color: $danger;
    font-weight: 600;
    margin-left: 4px;
  }
  .btn-link {
    padding: 0;
    margin-left: 0.6rem;
  }
}
</style>
