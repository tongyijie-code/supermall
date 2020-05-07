<template>
    <div v-if="Object.keys(comment).length>0" class="user-content">
      <div class="head">
        <div class="comment">用户评论</div>
        <a href="javascript:void (0);">更多<span>></span></a>
      </div>
      <div class="middle">
        <div class="user">
          <img :src="comment.user.avatar" alt="">
          <span>{{comment.user.uname}}</span>
        </div>
        <p>{{comment.content}}</p>
        <div class="data">
          <span>{{comment.created*1000 | timeFormatter('YYYY-MM-DD') }}</span>
          <span>{{comment.style}}</span>
        </div>
        <div>
          <img v-for="item in comment.images" :src="item" alt="" class="image">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "DetailComment",
      props: {
          comment: {
            type: Object,
            default() {
              return {}
            }
          }
      },
    }
</script>

<style scoped>
  .user-content{
    padding: 10px 10px;
    /*margin-bottom: 10px;*/
  }
.head {
  box-shadow: 0 2px 2px -2px rgba(0,0,0,0.5),
              0 -2px 2px -2px rgba(0,0,0,0.5);
  margin: 3px 5px;
  height: 60px;
  line-height: 60px;

}
  .comment {
    display: inline-block;
    float: left;

  }
  .head a {
    float: right;
    margin-right: 5px;
  }
  .user {
    margin: 10px 0;

  }
  .user img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 25px;
    margin-right: 10px;
  }
  .middle p {
    font-size: 14px;
    margin: 5px 0;
  }
  .data {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .data span{
    padding-right: 10px;
  }
  .image {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

</style>
