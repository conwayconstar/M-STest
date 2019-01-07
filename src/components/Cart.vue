<template>
    <div class="cart | mt-4">
        <h4 class="d-flex | justify-content-between align-items-center |  mb-3">
            <span class="text-muted">Your cart</span>
        </h4>

        <ul class="list-group | mb-3" v-if="products.length">
            <li class="list-group-item | d-flex | justify-content-between | lh-condensed"
                v-for="product in products"
                :key="product.id">
                <div>
                    <h6 class="my-0">{{ product.name}}</h6>
                    <small class="text-muted d-block">Quantity: {{product.quantity}}</small>
                    <small><a href="#" @click.prevent="removeFromCart(product)" class="text-danger">Remove</a></small>
                </div>
                <span class="text-muted">{{product.price * product.quantity | formatPrice}}</span>
            </li>

            <li class="list-group-item | d-flex | justify-content-between">
                <span>Total (GBP)</span>
                <strong>{{ total | formatPrice }}</strong>
            </li>


            <li class="list-group-item | d-flex | justify-content-between | bg-light"
                v-for="discount in discounts"
                :key="`discount${discount.id}`">
                <div class="text-success">
                    <h6 class="my-0">Discount</h6>
                    <small>{{ discount.name}}</small>
                </div>
                <span class="text-success">-{{ discount.total | formatPrice}}</span>
            </li>

            <li class="list-group-item |  d-flex | justify-content-between">
                <span>Shipping</span>
                <strong>{{ shipping | formatPrice }}</strong>
            </li>

            <li class="list-group-item | d-flex | justify-content-between">
                <span>Subtotal (GBP)</span>
                <strong>{{ subtotal | formatPrice }}</strong>
            </li>
        </ul>

        <ul class="list-group | mb-3" v-else>
            <li class="list-group-item | d-flex | justify-content-between">
              Empty Cart
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Cart",
        computed: {
            ...mapState('cart', [
                'products',
                'discounts',
                'total',
                'shipping',
                'subtotal',
            ])
        },
        methods: {
            removeFromCart(product) {
                return  this.$store.dispatch('cart/REMOVE_FROM_CART', product);
            }
        }
    }
</script>

<style scoped>

</style>