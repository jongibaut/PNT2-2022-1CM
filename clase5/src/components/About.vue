<template>
  <p>{{ $route.params.id }}</p>
</template>

<script>
export default {
  name: "Personaje",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    console.log("created", this.id);
  },
};
</script>