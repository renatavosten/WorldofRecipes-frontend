<template>
    <div class="favoriti">
        <div class="naslov">
            <h4 class="moji">Favoriti</h4>
        </div> 
        <div @click="gotoDetails(favorit)" :key="favorit.id" v-for="favorit in mojiFavoriti">
             <ReceptCard :info="favorit" />
        </div>
    </div>
</template>

<script>
import { Recepti, Auth } from '@/services';
import ReceptCard from '@/components/ReceptCard.vue';

export default {
    data() {
        return {
            mojiFavoriti: [],
            auth: Auth.state,
        }
    },

    created() {
        this.fetchMojiFavoriti();
    },
    methods: {
        async fetchMojiFavoriti() {
            this.mojiFavoriti = await Recepti.getMojiFavoriti(this.auth.username);
        },
        gotoDetails(favorit) {
            console.log("idem u detalje")
            this.$router.push({ path:`recept/${favorit.id}` });
        }
    },
    components: {
        ReceptCard
    }
}
</script>

<style lang="scss">
.favoriti{
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