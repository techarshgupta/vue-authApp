<template>
    <div class="container">
        <h1>Home</h1>
        <hr>
       
        <div class="flexbox">
            <md-card v-for="(article,index) in articles" :key="index">
               <md-card-media md-ratio="16:9">
                    <img :src="require(`../../assets/images/${article.img}`)"/>
                </md-card-media>

               <md-card-header>
                    <div class="md-title">{{ article.title}}</div>
                    <div class="md-subhead">{{ article.content }}</div>
                </md-card-header>

                <md-card-actions md-alignment="left">
                    <md-button>Enter</md-button>
                    <md-button>Like</md-button>
                </md-card-actions>
            </md-card>
         
        </div>
    </div>
</template>

<script>
    import { posts } from '../Utils/posts.js';

    export default {
        data(){
            return {
                articles: posts
            }
        }
    }

</script>

<style>
.flexbox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flexbox > div {
  /*
    1/3  - 3 columns per row
    10px - spacing between columns 
  */
  box-sizing: border-box;
  margin-bottom: 10px;
  width: calc(1/3*100% - (1 - 1/3)*10px);
}

.md-card {
    border: 1px solid #dbdbdb;
}

.md-card-actions {
        border-top: 1px solid gainsboro;
}
</style>
