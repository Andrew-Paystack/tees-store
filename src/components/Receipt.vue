<template>
  <div class="receipt">
    <div class="receipt__form">
      <div class="header">
        <h2>Customer details</h2>
      </div>
      <div class="form-item">
        <label>Email</label>
        <input type="email" v-model="email" />
      </div>
      <div class="form-item">
        <label>Address</label>
        <textarea v-model="address" />
      </div>
      <div class="form-item">
        <label>Mobile Money number</label>
        <input v-model="momo" readonly />
      </div>
    </div>
    <div class="receipt__items">
      <div class="receipt-total">
        <span>Total</span>
        <span>{{ parseCurrency(total) }}</span>
      </div>
    </div>
    <div class="receipt__checkout">
      <button :disabled="!isEmailValid" @click="makePayment">Checkout</button>
      <a id="sign-out" @click="signOut">Sign Out</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Receipt',
  data () {
    return {
      email: '',
      address: '',
      momo: localStorage.getItem('shopper').replace(/"/g, ''),
      loading: false
    }
  },
  mounted () {
    const popup = document.createElement('script')
    popup.setAttribute('src', 'https://js.paystack.co/v2/inline.js')
    popup.async = true
    document.head.appendChild(popup)
  },
  computed: {
    ...mapGetters('cart', {
      subtotal: 'cartTotalPrice'
    }),
    isEmailValid () {
      const regex = /\S+@\S+\.\S+/ // this is just a simple check

      return this.email && this.email.length > 0 && regex.test(this.email)
    },
    vat () {
      return 0.075 * this.subtotal
    },
    total () {
      return this.subtotal
    },
    isValidAddress () {
      return this.address.length > 5
    }
  },
  methods: {
    makePayment () {
      this.loading = true
      const data = {
        email: this.email,
        amount: this.total.toFixed(2),
        referenceNumber: this.randomRef(),
        phone: this.momo,
        network: 'MTN',
        address: this.address
      }
      this.$http
        .post('/direct_debits.json', JSON.stringify(data))
        .then((resp) => {
          // console.log(resp.data)
          alert('Please check your phone for transaction approval')
          this.resetForm()
        })
      this.loading = false
    },
    signOut () {
      localStorage.removeItem('shopper')
      this.$router.push('/login')
    },
    momoFormat () {
      if (this.momo.charAt(0) === '0') {
        return this.momo.replace('0', '233')
      } else {
        return this.momo
      }
    },
    resetForm () {
      this.email = ''
      this.address = ''
    },
    randomRef () {
      return (
        'PYSTCK ' + ((Math.random() * (10024 - 1024) + 1024) * 10000).toFixed(0)
      )
    },
    parseCurrency (amount) {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'GHS'
      }).format(amount)
    }
  }
}
</script>

<style lang="scss" scoped>
$gray: #f2f5f7;

.receipt {
  display: flex;
  flex-direction: column;

  &__form {
    width: 100%;
    margin-bottom: 48px;
  }

  .header {
    margin-bottom: 50px;
  }

  &__items {
    border-top: 1px dashed #ececec;
    padding-top: 30px;
    margin-bottom: 30px;
  }

  &__checkout {
    button {
      width: 100%;
      background: #3bb75e;
      color: white;
      border-radius: 5px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      height: 36px;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;

      &:disabled {
        background-color: rgba(59, 183, 94, 0.65);
        cursor: default;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span:first-child {
    margin-right: 24px;
  }
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    margin-bottom: 8px;
    font-weight: 500;
  }

  input,
  textarea {
    font-size: 14px;
    color: #737575;
    padding: 10px;
    border: 1px solid $gray;
    box-sizing: border-box;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03);
    border-radius: 6px;

    &:focus {
      border: 1px solid rgba(130, 130, 130, 0.2);
      outline: none;
    }
  }

  textarea {
    height: 80px;
    resize: none;
  }
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 600;

  span:first-child {
    margin-right: 24px;
  }
}
</style>
