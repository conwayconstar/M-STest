function sum(obj, prop, qty) {
    return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key][prop] * (qty ? obj[key][qty] : 1) || 0), 0);
}

const namespaced = true

export default {
    namespaced,
    state: {
        products: [],
        discounts: [],
        total: 0,
        shipping: 0,
        subtotal: 0,
    },
    mutations: {
        HANDLE_PRODUCT_ADD(state, product) {
            const record = state.products.find(v => v.id === product.id);

            if (!record) {
                state.products.push({
                    ...product,
                    quantity: 1
                })
            } else {
                record.quantity++
            }
        },

        HANDLE_PRODUCT_REMOVE(state, product){
           state.products =  state.products.filter(v => v.id !== product.id)
        },

        HANDLE_DISCOUNT(state, product) {
            const id = product.id,
                record = state.products.find(v => v.id === id);


            let total = 0, qty = record ? record.quantity : 0;

            if (id === 'J01' && record && qty > 1) {
                const discount = state.discounts.find(v => v.id === id);

                total = qty % 2 !== 0 ? (((qty - 1) / 2) * (product.price / 2)) : ((qty / 2) * (product.price / 2));

                if (!discount) {
                    state.discounts.push({
                        id, total, name: 'Buy one get one half price Jeans',
                    })
                } else if (qty > 1) {
                    discount.total = total;
                }
            }

            if(!state.products.find(v => v.id === 'J01')) {
                state.discounts =  state.discounts.filter(v => v.id !== 'J01');
            }
        },

        HANDLE_TOTAL(state) {
            const total =  Math.floor(sum(state.products, 'price', 'quantity') * 100) / 100,
                discountTotal = Math.floor(sum(state.discounts, 'total')* 100) / 100,
                discountedTotal = total - discountTotal;

            switch (true) {
                case discountedTotal < 50:
                    state.shipping = 4.95;
                    break;
                case discountedTotal < 90 :
                    state.shipping = 2.95;
                    break;
                case  discountedTotal >= 90:
                    state.shipping = 0;
                    break;
            }

            state.total = total;
            state.subtotal = discountedTotal + state.shipping;
        }
    },
    actions: {
        ADD_TO_CART({commit}, product) {
            commit('HANDLE_PRODUCT_ADD', product);
            commit('HANDLE_DISCOUNT', product);
            commit('HANDLE_TOTAL', product);
        },
        REMOVE_FROM_CART({commit}, product) {
            commit('HANDLE_PRODUCT_REMOVE', product);
            commit('HANDLE_DISCOUNT', product);
            commit('HANDLE_TOTAL', product);
        }
    }
}