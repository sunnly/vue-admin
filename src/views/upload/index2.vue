<!--<template>-->
<!--  <div>-->
<!--    <el-upload ref="upload" :on-change="handleChange" :on-remove="handleRemove"-->
<!--               :file-list="fileList" :auto-upload="false" :multiple="true">-->
<!--      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--      <el-button size="small" type="success" @click="handleSubmitUpload(fileList)"-->
<!--                 :loading="AllowUpload">外发到服务器</el-button>-->
<!--    </el-upload>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'index',-->
<!--  data(){-->
<!--    return {-->
<!--      fileList: [],-->
<!--      AllowUpload: false-->

<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleChange(){-->

<!--    },-->
<!--    handlerRemove(){-->

<!--    },-->
<!--    handleSubmitUpload(){-->
<!--      this.fileList.map(el => {-->
<!--        this.handleGetOssPara(this.CompanyId).then(res => {-->
<!--          if (res.Success) {-->
<!--            //创建文件-->
<!--            let formData = new FormData()-->
<!--            //表头信息-->
<!--            let config = {-->
<!--              headers: {-->
<!--                'Content-Type': 'multipart/form-data'-->
<!--              }-->
<!--            }-->

<!--            //传文件成功后需要的参数-->
<!--            let fileForm = {-->
<!--              fileName: el.name,-->
<!--              sourceKey: '',-->
<!--              fileSize: el.size,-->
<!--              FileConverId: res.data.FileConvertId,-->
<!--              touser: '',-->
<!--              companyId: this.CompanyId-->
<!--            }-->
<!--            let name = this._splitExtension(fileForm.fileName)-->
<!--            fileForm.sourceKey = res.data.dir + res.data.FileConvertId + '.' + name-->
<!--            this.checkUser.map(el => {-->
<!--              fileForm.touser += el + "|";-->
<!--            });-->
<!--            fileForm.touser = fileForm.touser.substring(0, fileForm.touser.length - 1);-->

<!--            //添加文件信息-->
<!--            formData.append('policy', res.data.policy)-->
<!--            formData.append('OSSAccessKeyId', res.data.accessid)-->
<!--            formData.append('success_action_status', '200')-->
<!--            formData.append('signature', res.data.signature)-->
<!--            formData.append('region', res.data.oshost)-->
<!--            formData.append('dir', res.data.dir)-->
<!--            formData.append('name', res.data.FileConvertId + '.' + name)-->
<!--            formData.append('key', res.data.dir + res.data.FileConvertId + '.' + name)-->
<!--            formData.append('file', el.raw)-->
<!--            axios.post(res.data.oshost, formData, config).then(success => {-->
<!--              this.handleSuccess(fileForm, el)-->
<!--            }).catch(error => {-->
<!--              postOssFile(fileForm).then(res => {-->
<!--                if (res.status == 201) {-->
<!--                  this.$message({-->
<!--                    message: res.tip,-->
<!--                    type: "error"-->
<!--                  });-->
<!--                }-->
<!--              });-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
