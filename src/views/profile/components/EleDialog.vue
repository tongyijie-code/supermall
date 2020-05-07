<template>
  <div>
    <el-dialog
      title="请登录"
      :visible.sync="dialogVisible"
      width="50%">
      <span>用户名</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button @click="dialogVisible=false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "EleDialog",
        props: {
            visible: {
                type: Boolean
            }
        },
        computed: {
            dialogVisible: {
                set(value) {
                  this.$emit('update:visible', value)
                },
                get() {
                    return this.visible
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭')
                    .then(_ => {
                        done()
                    })
                    .catch(_ => {})
            }
        }
    }
</script>

<style scoped>

</style>
