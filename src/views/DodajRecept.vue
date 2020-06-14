<template>
  <div class="dodajrecept">
    <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
        <div class="card border-info mb-3">
            <h1 class=" card-header text-info text-center mb-5">Dodaj novi recept</h1>  <!--ovo se ne vidi???? -->
            <div class="card-body">
                <!-- <div class="form-group text-center">
                    <croppa :width="350" :height="350" v-model="imageData"></croppa>
                </div> -->
               
                <form @submit.prevent="PostRecipes">
                    <div class="form-group col-md-12">
                        <label for="inputRecipes">Naziv recepta:</label>
                        <input v-model="ime" type="text" class="form-control" id="inputIme" placeholder="Upišite naziv recepta" required>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputSastojci">Sastojci:</label>
                        <textarea v-model="sastojci" class="form-control" id="inputSastojci" rows="6" placeholder="Upišite sastojke potrebne za pripremu" required></textarea>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputPriprema">Priprema:</label>
                        <textarea v-model="priprema" class="form-control" id="inputPriprema" rows="10" placeholder="Upišite pripremu recepta" required></textarea>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputVrijeme">Vrijeme pripreme:</label>
                        <input v-model="vrijeme_priprema" type="text" class="form-control" id="inputVrijeme" placeholder="Upišite vrijeme pripreme recepta">  
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputKategorija">Kategorija:</label>
                        <select v-model="kategorija" id="inputKategorija" class="form-control" placeholder="Odaberite kategoriju recepta">
                          <option v-for="i in inputKategorija" v-bind:key="i"> {{ i }} </option>
                        </select> 
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputSlika">Slika:</label>
                        <input v-model="slika" type="url" class="form-control" id="inputSlika" placeholder="Upišite url slike">  
                    </div>
                 
                    <div class="text-center">
                        <button type="submit" class="button">Objavi recept</button>
                    </div> 
                </form>                              
            </div>
          </div>
          <div class="col-sm-1"></div>
        </div>
      </div>
  </div>
</template>

<script>
import { Recepti, Auth } from '@/services';

export default {
  name: 'DodajRecept',
    data() {
        return {
            auth: Auth.state,
            errorMessage: '',
            ime: '',
            sastojci: '',
            priprema: '',
            vrijeme_priprema: '',
            inputKategorija: ["Deserti", "Hladna predjela", "Topla predjela", "Glavna jela", "Salate", "Kruh i peciva", "Juhe"],
            kategorija:'',
            slika: '',
            //imageData: null
        }
    },
    methods: {
        async PostRecipes() {
          let novi_recept = {
            naziv: this.ime,
            sastojci: this.sastojci,
            priprema: this.priprema,
            vrijeme_pripreme: this.vrijeme_priprema,
            inputKategorija: this.kategorija,
            slika: this.slika,
            username: this.auth.username
          };
          try {
            await Recepti.add(novi_recept);
          } catch (e) {
            console.error("Greška prilikom slanja posta ", e);
          } finally {
            alert("Uspješno dodan recept!");
            if (this.$route.name !== "home")
               this.$router.push({ name: "home" }).catch(err => console.log(err))
            console.log("dodan recept");
          }

        //  var user = firebase.auth().currentUser;
        //     this.imageData.generateBlob(blobData => {
        //         if (blobData != null) {
        //             let imageName = user.email + "/" + Date.now() + ".png";  
        //             storage
        //               .ref(imageName)
        //               .put(blobData)
        //               .then(result => {
        //                 result.ref.getDownloadURL()
        //                   .then(url => {
        //                     if (user) {
        //                       db.collection("Recepti")
        //                         .add({
        //                           inputIme: this.ime,
        //                           inputSastojci: this.sastojci,
        //                           inputPriprema: this.priprema,
        //                           inputvrijeme: this.vrijeme_priprema,
        //                           autor: user.email,
        //                           url:url
        //                         })
        //                         .then(() => {
        //                           alert("Uspješno dodan recept!");
        //                             if (this.$route.name !== "home")
        //                                 this.$router.push({ name: "home" }).catch(err => console.log(err))
        //                         })
        //                     }else{
        //                         //.catch(e => {
        //                          console.error("Error adding document: ", error);
        //                         //});
        //                        }   
        //                   })
        //                   .catch(e => {
        //                     console.error(e)
        //                   })
        //                 })
        //                 .catch(e => {
        //                   console.error(e)
        //                 })
        //         }
        //     });
        }
    }
}
</script>




<style lang ="scss">
.dodajrecept{
    padding-top: 70px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button {
  background-color: rgb(71, 170, 216);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button:hover {
  background-color: rgb(30, 122, 165);
}
</style>