<template>
    <div class="row">
        <div class="col-lg-12 col-md-12 mb-12 form-horizontal">
            <div class="form-group">
                <textarea class="form-control" placeholder="What's happening?" rows="3" v-model="status"></textarea>
            </div>
            <div class="form-group">
                <button class="btn-info" @click="addTweet">Post</button>
            </div>
        </div>
    </div>
</template>

<script>
 import {
        mapActions,
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                status: ''
            }
        },


    methods: {
        ...mapActions([
            'post'
        ]),

        addTweet() {
            let obj = {
              status: this.status
            }
            this.status = '',
            this.post(obj)
        }
    },
    }
</script>

<style>
    
</style>
