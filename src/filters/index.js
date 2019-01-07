import Vue from 'vue';

Vue.filter("formatPrice", price => {
    const roundDown = Math.floor(price * 100) / 100;
    return new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(roundDown)
});