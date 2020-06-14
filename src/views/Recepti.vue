<template>
    <div>
        
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
            <ReceptCard :info="card" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { Recepti } from '@/services';
import ReceptCard from '@/components/ReceptCard.vue';
import store from '@/store.js';
export default {
    data() {
        return {
            store,
            cards: [],
            
        };
    },
    //okida funkciju kada detektira promjenu na nekoj varijabli iz data()
    watch: {
        'store.searchTerm': _.debounce(function(val) {
           this.fetchRecepti(val);
        }, 500)
    }, 
    created() {
        this.fetchRecepti();
    },
    name: 'recepti',
    methods: {
        async fetchRecepti(term) {
            term = term || store.searchTerm;
            this.cards = await Recepti.getAll(term);
            
        },
        gotoDetails(card) {
            console.log("idem u detalje")
            this.$router.push({ path:`recept/${card.id}` });
        }
    },
    components: {
        ReceptCard
    }
};
</script>

<style scoped>
button {
    margin-bottom: 20px;
}

</style>