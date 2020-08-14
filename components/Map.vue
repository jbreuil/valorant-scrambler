<template>
  <div class="flex flex-col">
    <picture class="mx-2 md:mx-0">
      <source :srcset="mapWebp" type="image/webp" />
      <img :src="mapPng" :alt="map" />
    </picture>
    <div
      class="mx-2 md:mx-0 mt-1 flex flex-row items-center border border-gray-300 p-2 text-lg"
    >
      <div class="mx-auto">
        <span class="uppercase text-white">MAP : </span>
        <span id="map-name" class="capitalize text-orange-500">{{ map }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    map: {
      type: String,
      required: true,
    },
  },
  computed: {
    mapWebp() {
      return `/icons/maps/${this.map}.webp`
    },
    mapPng() {
      return `/icons/maps/${this.map}.png`
    },
  },
}
</script>
