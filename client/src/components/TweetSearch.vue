<template>
    <div class="col-lg-6">
        <div class="row">
            <div class="col-md-12 timeline-wrapper" v-for="(tweet, i) in searchStat" :key="i" style="margin-bottom: 20px;">
                <div class="card">
                    <div class="media ">
                        <span class="media-body twit-status">
                                      <h6 class="mt-0">{{tweet.userId.name}} <small>@{{tweet.userId.username}}</small></h6>
                                      <button class="btn btn-outline-info">Follow</button>
                                    </span>
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>{{tweet.status}}</p>
                            <footer class="blockquote-footer">Posted on {{tweet.createdAt}} </footer>
                        </blockquote>
                    </div>
                </div>
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

            }
        },
        computed: {
            ...mapState(['searchStat', 'tweets'])
        },
    }
</script>

<style>
    
</style>
