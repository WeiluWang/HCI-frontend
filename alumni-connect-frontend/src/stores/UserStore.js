import {extendObservable, action} from 'mobx';
import { runInAction } from 'mobx';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


class UserStore {
    constructor() {
        extendObservable(this, {

            loading: false,
            isLoggedIn: false,
            username: '',
            id:'',
            age:0,
            balance:0,
            email:"",
            role:0,
            location:'',
            gender:0,
            phone:""
        })
    }
    getDataFromSessionStorage = () => {
        let logIn, usrname,  pre_id, a, e, r, l ,g,p;
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        const username = sessionStorage.getItem("username");
        const age = sessionStorage.getItem("age");
        const email = sessionStorage.getItem("email");
        const role = sessionStorage.getItem("role");
        const location = sessionStorage.getItem("location");
        const gender = sessionStorage.getItem("gender");
        const phone = sessionStorage.getItem("phone");
        const id = sessionStorage.getItem("id");
        if (!isLoggedIn) {
            logIn = false;
        } else {
            logIn = JSON.parse(isLoggedIn);
        }
        if(!age){
            a = 0
        }else{
            a = JSON.parse(age)
        }
        if(!email){
            e = ''
        }else{
            e = JSON.parse(email)
        }
        if(!role){
            r = 0
        }else{
            r = JSON.parse(role)
        }
        if(!location){
            l = ''
        }else{
            l = JSON.parse(location)
        }
        if(!gender){
            g = 0
        }else{
            g = JSON.parse(gender)
        }
        if(!phone){
            p = ''
        }else{
            p = JSON.parse(phone)
        }
        if (!username) {
            usrname = '';
        } else {
            usrname = JSON.parse(username);
        }
        
        if(!id) {
            pre_id = '';
        } else {
            pre_id = JSON.parse(id);
        }
        runInAction(() => {
            this.isLoggedIn = logIn;
            this.age = a;
            this.username = usrname;
            this.email = e;
            this.role = r;
            this.location = l;
            this.gender = g;
            this.phone =p;
            this.id = pre_id;
        });
    }

    setDataFromSessionStorage = () => {
        sessionStorage.setItem("isLoggedIn",JSON.stringify(this.isLoggedIn));
        sessionStorage.setItem("username",JSON.stringify(this.username));
        sessionStorage.setItem("age",JSON.stringify(this.age));
        sessionStorage.setItem("email",JSON.stringify(this.email));
        sessionStorage.setItem("role",JSON.stringify(this.role));
        sessionStorage.setItem("role",JSON.stringify(this.role));
        sessionStorage.setItem("role",JSON.stringify(this.role));
        sessionStorage.setItem("role",JSON.stringify(this.role));
        sessionStorage.setItem("id",JSON.stringify(this.id));
    };
}

export default new UserStore();