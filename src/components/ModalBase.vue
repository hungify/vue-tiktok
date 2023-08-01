<script lang="ts" setup>
import { onClickOutside, onKeyStroke } from '@vueuse/core';

interface ModalProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  scrollBehavior?: 'inside' | 'outside';
  escToClose?: boolean;
  lockScroll?: boolean;
  overlayToClose?: boolean;
  modelValue?: boolean;
  value?: boolean;
  contentClass?: string;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  overlayClass?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  title: '',
  size: 'md',
  scrollBehavior: 'inside',
  escToClose: true,
  overlayToClose: true,
  lockScroll: true,
  modelValue: false,
  value: false,
  contentClass: '',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  overlayClass: '',
});

interface ModalEvents {
  (eventName: 'onClose'): void;
  (eventName: 'onOk'): void;
  (eventName: 'onEsc'): void;
  (eventName: 'onOverlayClick'): void;
  (eventName: 'update:modelValue', value: boolean): void;
}

const emit = defineEmits<ModalEvents>();

const isModalOpen = ref<boolean>(props.value ?? props.modelValue);

const modalRef = ref<HTMLElement | null>(null);

const handleCloseModal = () => {
  isModalOpen.value = false;
  emit('onClose');
  emit('update:modelValue', false);
};

const handleESC = () => {
  emit('onEsc');
  handleCloseModal();
};

const handleOkModal = () => {
  emit('onOk');
  handleCloseModal();
};

const handleClickOutside = () => {
  emit('onOverlayClick');
  handleCloseModal();
};

onClickOutside(modalRef, () => {
  if (props.overlayToClose) {
    handleClickOutside();
  }
});

onKeyStroke(true, (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    if (props.escToClose) {
      handleESC();
    }
  }
});

watch(
  () => props.value,
  (value) => {
    isModalOpen.value = value;
  },
);

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      isModalOpen.value = value;
    }
  },
);

watch(isModalOpen, (value) => {
  if (props.lockScroll) {
    const body = document.body;
    if (value) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }
});

const contentClasses = computed(() => {
  const { size } = props;
  return {
    [`modal-content-${size}`]: true,
    [props.contentClass]: true,
  };
});

const bodyClasses = computed(() => {
  const { scrollBehavior } = props;
  return {
    [`modal-body-${scrollBehavior}`]: true,
    [props.bodyClass]: true,
  };
});
</script>

<template>
  <Teleport to="body">
    <Transition name="scale">
      <div v-if="isModalOpen" class="modal-container">
        <section ref="modalRef" class="modal-content" :class="contentClasses">
          <div
            class="modal-header"
            :class="headerClass"
            :style="{ justifyContent: !!$slots.header ? 'space-between' : 'flex-end' }"
          >
            <slot name="header">
              {{ title }}
            </slot>
            <ButtonBase
              class="modal-close-btn"
              variant="link"
              color="default"
              @click="handleCloseModal"
            >
              <IconBase name="x" />
            </ButtonBase>
          </div>
          <div class="modal-body" :class="bodyClasses">
            <slot />
          </div>
          <div class="modal-footer" :class="footerClass">
            <slot name="footer">
              <ButtonBase class="modal-button" @click="handleCloseModal">Close</ButtonBase>
              <ButtonBase class="modal-button-ok" variant="ghost" @click="handleOkModal"
                >Ok</ButtonBase
              >
            </slot>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
$modalSizes: (
  xs: (
    max-width: $xs-modal-max-width,
    box-shadow: $xs-modal-box-shadow,
    border-radius: $xs-modal-border-radius,
    margin-top: $xs-modal-margin-top,
    margin-bottom: $xs-modal-margin-bottom,
  ),
  sm: (
    max-width: $sm-modal-max-width,
    box-shadow: $sm-modal-box-shadow,
    border-radius: $sm-modal-border-radius,
    margin-top: $sm-modal-margin-top,
    margin-bottom: $sm-modal-margin-bottom,
  ),
  md: (
    max-width: $md-modal-max-width,
    box-shadow: $md-modal-box-shadow,
    border-radius: $md-modal-border-radius,
    margin-top: $md-modal-margin-top,
    margin-bottom: $md-modal-margin-bottom,
  ),
  lg: (
    max-width: $lg-modal-max-width,
    box-shadow: $lg-modal-box-shadow,
    border-radius: $lg-modal-border-radius,
    margin-top: $lg-modal-margin-top,
    margin-bottom: $lg-modal-margin-bottom,
  ),
  xl: (
    max-width: $xl-modal-max-width,
    box-shadow: $xl-modal-box-shadow,
    border-radius: $xl-modal-border-radius,
    margin-top: $xl-modal-margin-top,
    margin-bottom: $xl-modal-margin-bottom,
  ),
  full: (
    max-width: $full-modal-max-width,
    box-shadow: $full-modal-box-shadow,
    border-radius: $full-modal-border-radius,
    margin-top: $full-modal-margin-top,
    margin-bottom: $full-modal-margin-bottom,
  ),
);

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1400;
  overflow: auto;
  overscroll-behavior-y: none;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

@each $size, $styles in $modalSizes {
  .modal-content-#{$size} {
    max-width: map-get($styles, max-width);
    box-shadow: map-get($styles, box-shadow);
    border-radius: map-get($styles, border-radius);
    margin-top: map-get($styles, margin-top);
    margin-bottom: map-get($styles, margin-bottom);
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  outline: transparent solid 2px;
  outline-offset: 2px;
  color: inherit;
  z-index: 1400;
  background-color: white;
}

.modal-header {
  flex: 0 1 0%;
  padding-inline-start: 1.5rem;
  padding-inline-end: 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  padding: 2rem 0;
}

.modal-close-btn {
  background-color: rgba(22, 24, 35, 0.03);
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  margin-right: 1rem;
}

.modal-body {
  padding-inline-start: 1.5rem;
  padding-inline-end: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  flex: 1 1 0%;

  &-inside {
    overflow: auto;
  }
}

.modal-footer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding-inline-start: 1.5rem;
  padding-inline-end: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.modal-button {
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: transparent solid 2px;
  outline-offset: 2px;
  line-height: 1.2;
  border-radius: 0.375rem;
  font-weight: 600;
  transition-property: all;
  transition-duration: 200;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 1rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  background: #3182ce;
  color: white;
  margin-right: 0.75rem;
}

.modal-button-ok {
  background: white;
  color: #000;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
