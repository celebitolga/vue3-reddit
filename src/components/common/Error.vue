<template>
  <div class="container center">
    <div class="card red">
      <div class="card-content white-text">
        <span class="card-title">{{error}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true,
    },
  },
}
</script>