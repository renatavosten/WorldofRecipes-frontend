<template>
    <div class="mojirecepti">
        <div class="naslov">
            <h4 class="moji">Moji recepti</h4>
        </div>
        <div @click="gotoDetails(recept)" :key="recept.id" v-for="recept in mojiRecepti">
            <ReceptCard :info="recept" />
        </div>
            
        
    </div>
</template>

<script>
import { Recepti, Auth } from '@/services';
import ReceptCard from '@/components/ReceptCard.vue';

export default {
    data() {
        return {
            mojiRecepti: [],
            auth: Auth.state,
        }
    },

    created() {
        this.fetchMojiRecepti();
    },
    methods: {
        async fetchMojiRecepti() {
            this.mojiRecepti = await Recepti.getMojiRecepti(this.auth.username);
        },
        gotoDetails(recept) {
            console.log("idem u detalje")
            this.$router.push({ path:`recept/${recept.id}` });
        }
    },
    components: {
        ReceptCard
    }
}
</script>

<style lang="scss">
.mojirecepti{
    padding-top: 100px;
}
.card-header{
    color: black;
}
.naslov{
    background:rgb(255, 255, 255);
    max-width: 920px;
    margin: 20px auto;
    padding:  20px 30px;
    border-radius: 10px 120px 10px 10px;
    box-shadow: 10px 30px 50px rgba(0,0,0,0.1)
}
.moji{
    font-size: 40px;
    text-align: center;
}
</style>