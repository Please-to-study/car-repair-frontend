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
          <p class="login_panel_form_title_p">{{ Config.adminName }}</p>
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
                v-model="loginFormData.managerId"
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
                size="large"
                style="width: 46%; margin-left: 8%"
                @click="submitForm"
            >登 录</el-button>
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
      //管理员密码强度正则，6-16位数字字母组成
      const passwordRegexr = /[a-zA-Z0-9]{6,16}/;
      if (!passwordRegexr.test(value)) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }


    const loginForm = ref(null)
    const loginFormData = reactive({
      managerId: '',
      password: '',
    })
    const rules = reactive({
      managerId: [{ validator: checkUsername, trigger: 'blur' }],
      password: [{ validator: checkPassword, trigger: 'blur' }],
    })

    const login = (data) => {
      return service({
        url: '/manager/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    }

    const goHome = () => {
      router.push({
        path: '/managerHome',
      })
    }

    // const goRegister = () => {
    //   router.push({
    //     path: '/register',
    //   })
    // }
    //
    //
    //
    // const registerForm = () => {
    //   goRegister();
    // }

    const submitForm = () => {
      loginForm.value.validate(async(v) => {
        if (v) {
          const res = await login(loginFormData)
          if (res.data.status == 200) {
            // store.commit('user/updateInfo', res.data.userID)
            goHome();
          }else {
            console.log(res.data);
            ElMessage({
              type: 'error',
              message: res.data.msg,
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

    return {
      submitForm,
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
