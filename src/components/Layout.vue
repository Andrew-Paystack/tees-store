<template>
  <div class="layout">
    <div class="layout__left">
      <Cart />
    </div>
    <div class="layout__right">
      <Receipt />
    </div>
    <!-- <Magazine /> -->
  </div>
</template>

<script>
import Cart from './Cart.vue'
import Receipt from './Receipt.vue'
// import Magazine from './Magazine.vue'
export default {
  name: 'Layout',
  components: {
    Cart,
    Receipt

    // Magazine
  },
  mounted: function () {
    if (!localStorage.getItem('shopper')) {
      this.$router.push('/login')
    }
    // End session after 10 minutes.
    setTimeout(this.endSession, 5000)
  },
  methods: {
    endSession () {
      alert('Your session has expired. We\'re logging you out.')
      localStorage.removeItem('shopper')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$light-gray: #fbfbfb;

.layout {
  display: flex;

  &__left {
    width: 70vw;
    padding: 32px;
    background: $light-gray;
  }

  &__right {
    width: 30vw;
    height: 80vh;
    padding: 32px;
  }
}
</style>
