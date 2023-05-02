<script lang="ts" setup>
import { useField } from 'vee-validate';

interface BaseInputFieldProps {
  value?: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  successMessage?: string;
}

const props = defineProps<BaseInputFieldProps>();

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(toRef(props, 'name'), undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="base-input-field" :class="{ error: !!errorMessage, success: meta.valid }">
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      class="base-input-field-input"
      @input="handleChange"
      @blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-input-field {
  position: relative;
  width: 100%;
  & + & {
    margin-top: 1.5rem;
  }
  &.error {
    .base-input-field-input {
      border-color: $danger;
    }
    .base-input-field-message {
      color: $danger;
    }
  }

  &.success {
    .base-input-field-input {
      border-color: $success;
    }
    .base-input-field-message {
      color: $success;
    }
  }

  &-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
    font-size: 1.4rem;
    font-weight: 600;
  }
  &-input {
    padding: 1.2rem;
    border-radius: 4px;
    color: inherit;
    flex-grow: 1;
    font-size: 1.5rem;
    height: 100%;
    width: 100%;
    background-color: rgba($text, 0.06);
    border: 1px solid rgba($text, 0.12);
  }
  &-message {
    color: $danger-light;
    margin: 0;
    font-size: 14px;
  }
}
</style>
