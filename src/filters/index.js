import Vue from 'vue';

Vue.filter("formatPrice", price => new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(price));