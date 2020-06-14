<template>
    <div class="kartice">
        <div class="row">
            <div class="col-sm-8">
                <div class="card">
                    <img class="card-img-top" :src="info.url" alt="slika">
                    <div class="card-body">
                      
                        <h4 class="card-title">{{info.title}}</h4>
                        
                        <div v-if="showdetail">
                          <div class="favoriti" @click="dodajFavorita()">
                            <i class="fas fa-heart fa-2x"></i>
                          </div>
                          <h6 class="card-title">Kategorija: {{info.kategorija}} </h6>
                          <h6 class="card-title">Vrijeme pripreme: {{info.vrijeme}} </h6>
                          <h6 class="card-title">Sastojci: </h6>
                          <p>
                            <ul>
                              <li> {{info.sastojci}} </li>
                            </ul>
                          </p>
                          <h6 class="card-title">Priprema:  </h6>
                          <p>
                            {{info.priprema}}
                          </p>
                          <h6 class="ocjena">Ocjena: </h6>
                          <div style="text-align:center">
                            <form @submit.prevent="postOcjena">
                              <div class="form-check form-check-inline">
                                <input v-model="ocjena" class="form-check-input" type="radio" name="inlineRadioOptions" id="jedan" value="1">
                                <label class="form-check-label" for="jedan">1</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input v-model="ocjena" class="form-check-input" type="radio" name="inlineRadioOptions" id="dva" value="2">
                                <label class="form-check-label" for="dva">2</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input v-model="ocjena" class="form-check-input" type="radio" name="inlineRadioOptions" id="tri" value="3">
                                <label class="form-check-label" for="tri">3</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input v-model="ocjena" class="form-check-input" type="radio" name="inlineRadioOptions" id="četiri" value="4">
                                <label class="form-check-label" for="četiri">4</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input v-model="ocjena" class="form-check-input" type="radio" name="inlineRadioOptions" id="pet" value="5">
                                <label class="form-check-label" for="pet">5</label>
                              </div>
                              <p></p>
                              <div>
                                <button type="submit" id="btn">Spremi ocjenu</button>
                              </div>
                              <p></p>
                            </form>
                          </div>
                        </div>
                        <div v-if="showcomments">
                          <h6>Komentari: </h6>
                          <div class="comments list-group">
                            <a :key="c.id" v-for="c in comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
                              <div class="d-flex w-100 justify-content-between">
                                <small>by {{ c.username }} </small>
                                <!-- Mogućnost da korisnik može odabrati brisanje komentara -->
                                <a @click="removeComment(c.id)" href="#">Izbriši</a>
                              </div>
                              <small>{{ c.comment }}</small>
                            </a>
                          </div>
                          <p></p>
                          <form @submit.prevent="postComment">
                            <div class="form-group">
                              <input v-model="newComment" type="text" class="form-control" id="imageUrl" placeholder="Upišite komentar">
                            </div>
                            <div style="text-align:center">
                              <button type="submit" id="btn1">Objavi komentar</button>
                            </div>
                          </form>
                        </div>
                    </div>
                    <div class="card-footer text-left">
                        <div> Autor: {{ info.username }}</div>
                    </div>
                </div>
          
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import store from '@/store.js'
import { Recepti, Auth } from '@/services';

export default {
  props: [ "info","showdetail", "showcomments" ],
  data () {
    return {
      global: store,
      auth: Auth.state,
      ocjena: [],
      newComment: '',
      comments: [],
      //favoriti: []
    }
  },
  
  methods: {
    async postOcjena(){
      let receptId = this.info.id;
      let ocjena_recepta = {
        ocjena: this.ocjena,
      };
      try {
        await Recepti.dodajOcjenu(receptId, ocjena_recepta);
      } catch (e) {
        console.error("Greška prilikom slanja ocjene", e);
      } finally {
        alert("Uspješno ocijenjen recept!");
        if (this.$route.name !== "home")
          this.$router.push({ name: "home" }).catch(err => console.log(err))
        console.log("dodana ocjena " + this.ocjena);
      }
    },
    async dodajFavorita() {
      let username = this.auth.username;
      let receptId = this.info.id;
      let favorit = {
        //favoriti: this.favoriti,
        username: this.auth.username,
        receptId: receptId
      };
      try {
        await Recepti.dodajFavorita(username, receptId, favorit);
      } catch (e) {
        console.error("Greška prilikom spremanja favorita", e);
      } finally {
        alert("Recept uspješno spremljen u favorite!");
        console.log("dodan favorit " + this.favorit);
      }
    },
    async refresh() {
      let recept = await Recepti.getOne(this.info.id);
      this.prikaz_komentara();
    },
    async removeComment(commentId) {
      let receptId = this.info.id;
      await Recepti.Comments.delete(receptId, commentId);
      this.refresh();
    },
    async postComment() {
      if(this.newComment) {
        let receptId = this.info.id;
        let comment = {
          username: this.auth.username,
          comment: this.newComment,
          receptId: receptId
        };
        try {
          await Recepti.Comments.add(receptId, comment);
          this.refresh();
        } catch (e) {
          console.error('Greška prilikom snimanja komentara', e);
        } finally {
          this.newComment = '';
          alert("Uspješno dodan komentar!");
          console.log("dodan komentar");
        }
      }
    },
    async prikaz_komentara() {
      this.comments = await Recepti.Comments.getComment(this.info.id);
    },
    
  },
  //dohvat komentara
  mounted() {
    this.prikaz_komentara();
  },
    
 
}
</script>

<style>
 .text-center {
  color:white;
}
.card-img-top {
  width: 100%;
  object-fit: cover;
  height: 15vw;
}
.kartice {
  margin-top: 120px;
  
}
.col-sm-8{
  margin-left: 190px;
}
#btn{
  background-color: rgb(66, 198, 250);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
#btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

#btn1{
  background-color: rgb(66, 198, 250);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
#btn1:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
.ocjena{
  text-align: center;
}
.favoriti{
  float: right;
  cursor: pointer;
  
}
.fa-heart:hover{
  color: rgb(0, 225, 255);
}
</style>