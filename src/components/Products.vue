<template>
    <div class="row |  text-center | mt-4">
        <div class="col-md-4" v-for="product in products" :key="product.id">
            <div class="card">
                <div class="card-header">
                    <h4>{{product.name}}</h4>
                </div>

                <div class="card-body">
                    <h2>{{product.price | formatPrice}}</h2>

                    <a href="#" @click.prevent="addToCart(product)" class="btn btn-primary">Add To Cart</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Products",
        data() {
            return {
                products: [
                    {
                        id: 'J01',
                        name: 'Jeans',
                        price: 32.95,
                    },
                    {
                        id: 'B01',
                        name: 'Blouse',
                        price: 24.95,
                    },
                    {
                        id: '',
                        name: 'Socks',
                        price: 7.95
                    }
                ]
            }
        },
        methods: {
            addToCart(product) {
              return  this.$store.dispatch('cart/ADD_TO_CART', product);
            }
        }
    }
</script>

<style scoped>

</style>