<template>
  <div id="userLayout">
    <div class="login_panel">
      <div class="login_panel_form">
        <div class="login_panel_form_title">
          <img
              class="login_panel_form_title_logo"
              :src="Config.appLogo"
              alt
          >
          <p class="login_panel_form_title_p">{{ Config.appName }}</p>
        </div>
        <el-form
            ref="loginForm"
            :model="loginFormData"
            :rules="rules"
            :validate-on-rule-change="false"
            @keyup.enter="submitForm"
        >
          <el-form-item prop="username">
            <el-input
                v-model="loginFormData.userid"
                placeholder="请输入用户名"
            >
              <template #suffix>
                <span class="input-icon">
                  <el-icon>
                    <user />
                  </el-icon>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="loginFormData.password"
                type="password"
                show-password
                placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 46%"
                size="large"
                @click="registerForm"
            >注册</el-button>
            <el-button
                type="primary"
                size="large"
                style="width: 46%; margin-left: 8%"
                @click="submitForm"
            >登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                size="large"
                style="width: 46%; margin-left: 25%"
                @click="handleAdminLogin"
            >管理员登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_panel_right" />
    </div>
  </div>
</template>

<script>

import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Config from "../../core/config";
import service from "../../utils/request"



export default {
  setup () {

    const router = useRouter();

    const store = useStore()
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


    const loginForm = ref(null)
    const loginFormData = reactive({
      userid: '',
      password: '',
    })
    const rules = reactive({
      userid: [{ validator: checkUsername, trigger: 'blur' }],
      password: [{ validator: checkPassword, trigger: 'blur' }],
    })

    const login = (data) => {
      return service({
        url: '/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    }

    const goHome = () => {
      router.push({
        path: '/home',
      })
    }

    const goRegister = () => {
      router.push({
        path: '/register',
      })
    }



    const registerForm = () => {
      goRegister();
    }

    const submitForm = () => {
      loginForm.value.validate(async(v) => {
        if (v) {
          const res = await login(loginFormData)
          if (res.data.status == 200) {
            store.commit('user/updateInfo', loginFormData.userid)
            goHome();
          }else {
            console.log(res.data);
            ElMessage({
              type: 'error',
              message: '请先注册',
              showClose: true,
            })
          }
        } else {
          ElMessage({
            type: 'error',
            message: '请正确填写登录信息',
            showClose: true,
          })
          return false
        }
      })
    }


    const handleAdminLogin = () => {
      router.push({
        path: '/manager',
      })
    }

    return {
      submitForm,
      handleAdminLogin,
      registerForm,
      rules,
      loginFormData,
      loginForm,
      Config,
    };
  }
}


</script>

<style lang="scss" scoped>
@import "../../style/newLogin.scss";
</style>
