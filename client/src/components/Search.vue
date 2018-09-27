<template>
    <div class="col-md-4">
        <div class="card  mb-3" style="max-width: 18rem;">
            <div class="card-body">
                <input type="text" placeholder="Search..." v-model="tosearch">
                <router-link :to="`/search`">
                    <button class="btn-info" @click="search">Search</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                tosearch: "",
                changetoSearch: false
            };
        },
        computed: {
            ...mapState(['searchStat', 'tweets'])
        },
        methods: {
            ...mapActions(['searchTweet']),
    
            search() {
                let obj = {
                    tosearch: this.tosearch
                }
                this.searchTweet(obj)
            }
        },
        watch: {
    
        }
    };
</script>

<style>
    
</style>
