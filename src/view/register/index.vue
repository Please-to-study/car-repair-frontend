<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <div class="titleStyle">用户注册</div>
      <el-form ref="registerForm" :size="size" :model="form" :rules="rules"  class="formStyle">
        <el-form-item label="user name" prop="userid">
          <el-input size="small" v-model="form.userid" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input size="default" type="password" show-password v-model="form.password" />
        </el-form-item>
        <el-form-item label="real name" prop="name">
          <el-input size="default" v-model="form.name" />
        </el-form-item>
        <el-form-item label="user email" prop="mail">
          <el-input size="default" v-model="form.mail" />
        </el-form-item>
        <el-form-item label="user phone" prop="phone">
          <el-input size="default" v-model="form.phone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="buttonStyle" @click="handleRegister">Register</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>
<script>
import { useStore } from 'vuex'
import service from "../../utils/request"
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import { useRouter } from 'vue-router';



export default {
  setup () {

    const router = useRouter()
    // const store = useStore()
    // const userInfo = store.getters["user/getInfo"]
    // const businessInfo = store.getters["businessINFO/getInfo"]
    // const couponInfo = {
    //   ...userInfo,
    //   ...businessInfo
    // }

    const registerForm = ref(null)
    const size = ref('small')
    const form = reactive({
      userid: '',
      name: '',
      mail: '',
      phone: '',
      password: '',
    })

    const request = (url, data) => {
      return service({
        url: url,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    }

    const checkUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线）
      const userNameRegexr = /^[a-zA-Z0-9_]{4,16}$/;
      if (!userNameRegexr.test(value)) {
        return callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      const passwordRegexr = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if (!passwordRegexr.test(value)) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }

    const checkEmail = (rule, value, callback) => {
      //Email正则
      const emailRegexr = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!emailRegexr.test(value)) {
        return callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }

    const checkPhone = (rule, value, callback) => {
      //电话正则
      const phoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      if (!phoneRegexr.test(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }

    const checkRealName = (rule, value, callback) => {
      //中文正则
      const realnameRegexr = /[\u4e00-\u9fa5]+/g;
      if (!realnameRegexr.test(value)) {
        return callback(new Error('请输入正确的名字'))
      } else {
        callback()
      }
    }


    const rules = reactive({
      userid: [{ required: true, validator: checkUsername, trigger: 'blur' }],
      name: [{ required: true, validator: checkRealName, trigger: 'blur' }],
      password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
      mail: [{ required: true, validator: checkEmail, trigger: 'blur' }],
      phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
    })

    const goLogin = () => {
      router.push({
        name: "Login",
      })
    }


    const handleRegister =  async () => {
      const res = await request('/register', form);
      console.log('/register:', res);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '注册成功 请登录',
          showClose: true,
        })
        goLogin();
      }else {
        ElMessage({
          type: 'error',
          message: '注册失败 ' + res.data.msg,
          showClose: true,
        })
      }
    }


    return {
      handleRegister,
      registerForm,
      size,
      form,
      rules,
    };

  }
}
</script>

<style lang="scss">

.titleStyle{
  font-size: 24px;
  position: absolute;
  //width: 400px;
  margin-top: 50px;
  left: 50%;
  margin-left: -40px;
}
.formStyle{
  position: absolute;
  width: 400px;
  margin-top: 100px;
  left: 50%;
  margin-left: -200px;
}
.buttonStyle {
  margin-top: 40px;
  position: absolute;
  left: 50%;
  margin-left: -40px;
}
</style>
