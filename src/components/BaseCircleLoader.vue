<template>
  <span class="base-circle-loader"></span>
</template>

<style lang="scss" scoped>
@use '../styles/colors' as *;

.base-circle-loader {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px dashed $white;
  border-radius: 50%;
  animation: 1s rotation linear infinite;
}

@keyframes rotation {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
