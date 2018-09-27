<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <router-link :to="`/`">
                <a class="navbar-brand">Victwitter</a>
            </router-link>
    
            <div class="header-right row" v-if="!isLogin">
                <input type="text" placeholder="username / email" v-model="acc">
                <input type="password" placeholder="password" v-model="password">
                <button class="btn-info" style="margin-left: 10px;" @click="loginBtn">Login</button>
            </div>
            <button v-if="isLogin" class="btn-info" @click="logoutBtn">Logout</button>
        </div>
        <div v-if="errMessage" class="alert alert-primary" role="alert">
            {{errMessage}}
        </div>
        <div v-if="notif" class="alert alert-primary" role="alert">
            {{notif}}
        </div>
    </nav>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                email: "",
                password: "",
                username: "",
                isLogin: false,
                acc: ""
            };
        },
    
        methods: {
            ...mapActions(["login", "logout"]),
    
            loginBtn() {
                let obj = {
                    // email: this.email,
                    password: this.password,
                    // username: this.username,
                    acc: this.acc
                };
                console.log(obj);
    
                this.login(obj);
            },
    
            logoutBtn() {
                this.logout();
                this.isLogin = false;
                this.email = ''
                this.password = ''
            }
        },
    
        computed: {
            ...mapState(["token", "errMessage", "notif"])
        },
    
        created() {
            let isToken = localStorage.getItem("token");
    
            if (isToken) {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        },
    
        watch: {
            token() {
                this.isLogin = this.token;
            }
        }
    };
</script>

<style>
    
</style>
