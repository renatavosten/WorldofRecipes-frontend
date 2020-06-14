<template>
    <div class="mojprofil">
        <div class="row">
            <div class="col-sm-9">
                <div class="card text-center">
                    <h4 class="card-header">Moj profil</h4>
                    <div class="card-body">
                        <router-link to="/favoriti">
                            <button id="gumb1">Favoriti</button>
                        </router-link>
                        &nbsp;
                        <router-link to="/mojirecepti">
                            <button id="gumb1">Moji recepti</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.mojprofil{
    padding-top: 100px;
}
.card-header{
    color: black;
}
.col-sm-9{
    margin-left: 130px;
    
}
#gumb1{
  border-radius: 4px;
  background-color: rgb(66, 198, 250);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 23px;
  transition: all 0.5s;
  
}
#gumb1:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>