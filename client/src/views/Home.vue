<template>
  <div class="home">
    <Profile v-if="check_login"></Profile>
    <Search v-if="check_login"></Search>
    <Post v-if="check_login"></Post>
    <Follow></Follow>
    <router-view></router-view>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar";
  import Search from "@/components/Search";
  import Profile from "@/components/Profile";
  import Follow from '@/components/Follow.vue';
  import Post from '@/components/Post'
  import {
    mapActions,
    mapState
  } from "vuex";
  export default {
    name: "home",
    components: {
      Navbar,
      Search,
      Profile,
      Follow,
      Post,
    },
    data() {
      return {
        check_login: false
      };
    },
  
    computed: {
      ...mapState(["token", "errMessage", "notif"])
    },
  
    created() {
      let isToken = localStorage.getItem("token");
      if (isToken) {
        this.check_login = true;
      } else {
        this.check_login = false;
      }
    },
  
    watch: {
      token() {
        this.check_login = this.token
      }
    }
  };
</script>
