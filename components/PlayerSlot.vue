<template>
  <div class="flex">
    <picture :class="[`border-${variant}-600`, 'border-l-4']">
      <source :srcset="agentWebp" type="image/webp" />
      <img :src="agentPng" :alt="agent" />
    </picture>
    <input
      :class="['slot', `bg-${variant}-300`]"
      :value="value"
      type="text"
      @input="$emit('input', $event.target.value)"
      @focus="$event.target.select()"
    />
  </div>
</template>

<script>
export default {
  name: 'PlayerSlot',
  props: {
    value: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'red',
    },
    agent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    agentWebp() {
      return `${this.$router.options.base}icons/agents/${this.agent}.webp`
    },
    agentPng() {
      return `${this.$router.options.base}icons/agents/${this.agent}.png`
    },
  },
}
</script>

<style lang="postcss">
.slot {
  @apply w-full font-semibold text-white pl-2 border-l border-white;
}

.slot:focus {
  @apply outline-none;
}
</style>
