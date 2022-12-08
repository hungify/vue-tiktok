<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

interface BaseInputFieldProps {
  value?: string;
  name: string;
  label: string;
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
    <label :for="name" class="base-input-field-label">{{ label }}</label>
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
    <p v-if="errorMessage && meta.touched" class="base-input-field-message">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}

.base-input-field {
  position: relative;
  & + & {
    margin-top: 1.5rem;
  }
  &.error {
    .base-input-field-input {
      border-color: var(--error-color);
    }
    .base-input-field-message {
      color: var(--error-color);
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
    background-color: rgba(22, 24, 35, 0.06);
    border: 1px solid rgba(22, 24, 35, 0.12);
  }
  &-message {
    color: rgb(255, 76, 58);
    margin: 0;
    font-size: 14px;
  }
}
</style>
