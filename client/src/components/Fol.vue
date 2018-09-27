<template>
  <div class="col-lg-3">
    <div class="card  mb-3" style="max-width: 18rem;" v-for="(user, i) in show" :key="i">
      <div class="card-body who-to-follow">
        <h5 class="card-title">Who to Follow <small><a href="#">Refresh</a></small></h5>
        <ul id="recently-followed">
          <li>
            <div class="media ">
              <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
              <span class="media-body twit-status">
                  <h6 class="mt-0">Johny Walker <small>@johnywalker</small></h6>
                  <button class="btn btn-outline-info">Follow</button>
                </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState
  } from "vuex";
  import axios from "axios";
  export default {
    data() {
      return {
        usershaha: [],
        show: [],
        counter: 0,
        baseUrl: "http://localhost:3000"
      };
    },
    methods: {
      ...mapActions(["allUsers"]),
      whoToFoll() {
        axios({
            method: "GET",
            url: `${this.baseUrl}/users`
          })
          .then(data => {
            this.usershaha = data.data.data;
            this.show = [];
            this.users.forEach((element, index) => {
              if (index < this.counter + 3 && index >= this.counter) {
                this.show.push(element);
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      next() {
        this.counter += 3;
      },
      previous() {
        this.counter -= 3;
      }
    },
    computed: {
      ...mapState(["users"])
    },
    created() {
      this.allUsers();
    },
  
    watch: {
      counter() {
        this.allUsers();
      }
    }
  };
</script>


<style>
  
</style>
