<template>
    <div v-if="Object.keys(paramInfo).length > 0" class="detail-param">
      <table v-for="table in paramInfo.sizes">
        <tr v-for="tr in table">
          <td v-for="td in tr">{{td}}</td>
        </tr>
      </table>
      <table>
        <tr v-for="tr in paramInfo.infos">
          <td>{{tr.key}}</td>
          <td>{{tr.value}}</td>
        </tr>
      </table>
      <div v-if="paramInfo.image.length > 0">
        <img :src="paramInfo.image" alt="">
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailParamInfo",
      props: {
          paramInfo: {
            type: Object,
            default() {
              return {}
            }
          }
      }
    }
</script>

<style scoped>
.detail-param {
  margin-top: 5px;
  padding: 0 5px;
  font-size: 14px;
}
tr {
  border: 1px solid #ccc;
}
tr td {
  padding: 0 20px;
  height: 30px;

}
  tr td:nth-child(1) {
    padding: 0 15px;
    width: 80px;
    margin-right: 15px;
  }
</style>
