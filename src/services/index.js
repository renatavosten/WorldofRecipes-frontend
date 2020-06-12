import axios from 'axios';
import $router from '@/router';

// instanca axios-a 
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
});
//prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    return request;
    
});

//nakon svakog odgovora s backend-a izvrši:
Service.interceptors.response.use(
    (response) => {
        console.log('Interceptor', response);
        return  response;
    },
    (error) => {
        if (error.response.status == 401) {
            Auth.logout();
            $router.go();
        }
    }
);
// Service.interceptors.response.use(
//     (response) => response, (error) => {
//     if (error && error.status && error.response.status == 401 || error.response.status == 403) {
//         Auth.logout();
//         $router.go();
//     }
// });

// naš objekt 
let Recepti = {

    add(recept) {
        return Service.post('/recepti', recept);
    },
    async getOne(id) {
        console.log("ulazim u backend")
        let response = await Service.get(`/recepti/${id}`);
        let doc = response.data;
        let rezultat = function (item) {
            var fullsastojak = [item.sastojak, ": ", item.kolicina].join("");
            return fullsastojak;
        }
        let popisSastojaka = doc.sastojci.map(rezultat);
        let string_popis_sastojaka = popisSastojaka.toString();
        return {
            id: doc._id,
            url: doc.slika,
            email: doc.postedBy,
            title: doc.naziv,
            kategorija: doc.kategorija,
            sastojci: string_popis_sastojaka,
            priprema: doc.priprema,
            vrijeme: doc.vrijeme
        };
    }, 
    async getAll() {

        let response = await Service.get('/recepti');
        return response.data.map(doc => {
            return {
            id: doc._id,
            url: doc.slika,
            email: doc.postedBy,
            title: doc.naziv,
                
            };
        });
    }
      
};

//objekt za provjeru tokena i dohvaćanje korisničkih podataka
let Auth = {
    async register(username, mail, password) {
        let response = await Service.post('/users', {
            username: username,
            mail: mail,
            password: password,
        });

        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    async login(mail, password) {
        let response = await Service.post('/auth', {
            mail: mail,
            password: password,
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    logout() {
        localStorage.removeItem('user');
    },
    //izvlači korisnika iz localStorage-a
    getUser() {
        return JSON.parse(localStorage.getItem('user'));  //vraća ga u objekt iz stringa
    },
    getToken() {
        let user = Auth.getUser();
        if (user && user.token) {
            return user.token;
        }
        else {
            return false;
        }
    },
    //provejrava da li smo autentificirani
    authenticated() {
        let user = Auth.getUser();
        if (user && user.token) {
            return true;
        }
        return false;
    },
    state: {
        get authenticated() {
            return Auth.authenticated();
        }
    },
};

export { Service, Recepti, Auth }; // exportamo Service za ručne pozive ili Recepti za metode