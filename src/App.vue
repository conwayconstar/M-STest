<template>
    <div id="app">
        <navigation/>

        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <products/>
                </div>

                <div class="col-lg-4">
                    <cart/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from './components/Navigation';
    import Products from './components/Products';
    import Cart from './components/Cart';

    export default {
        name: 'app',
        components: {
            Navigation,
            Products,
            Cart,
        }
    }
</script>

<style>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css';

    .navbar-light .navbar-nav .nav-link.router-link-exact-active {
        color:#000;
    }
</style>
