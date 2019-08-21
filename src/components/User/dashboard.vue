<template>
    <div class="container dashboard">
        <h1>Dashboard</h1>
        <div class="dash_content">
            <h3>Hello <span>USER</span>{{userEmail}} !!</h3>
            <p>Here you can use you dashboard because you are authenticated</p>
        </div>
    </div>
</template>


<script>
    export default {
        computed:{
          userEmail(){
              if(this.$store.state.user){
                  return this.$store.state.user.email;
              }
          }
        },
        created() {
            let tokenId = this.$store.state.token;
            this.$store.dispatch('getUserInfo',tokenId)
        }
    }
</script>
