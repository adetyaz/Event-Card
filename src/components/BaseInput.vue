<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listener"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  mixins: [formFieldMixin],
  computed: {
    listener() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  }
};
</script>
