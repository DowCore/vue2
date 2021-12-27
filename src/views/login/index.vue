<template>
  <div class="box">
    <div class="login-form">
      <div class="login-form-title">登录</div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-width="0"
      >
        <el-form-item label="" prop="username" style="margin-bottom: 32px">
          <el-input
            type="input"
            v-model="loginForm.username"
            placeholder="请输入账号"
            clearable
            autocomplete="off"
          >
            <template slot="prepend">
              <svg-icon data="@svg/user.svg"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password" style="margin-bottom: 32px">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            clearable
            autocomplete="off"
          >
            <template slot="prepend">
              <svg-icon data="@svg/password.svg"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button-grow" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: {
    SocialSign,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery,
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: url(https://coolbackgrounds.io/images/unsplash/josh-bean-medium-9501ba9f.jpg)
    no-repeat fixed;
  background-size: cover;
}

.login-form {
  display: flex;
  position: relative;
  width: 480px;
  height: 320px;
  flex-direction: column;
  padding: 32px 64px;
  text-align: center;
  z-index: 1;
  background: inherit;
  border-radius: 18px;
  overflow: hidden;

  &-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #3d5245;
  }
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    /* + 两边各有一个空格  否则 无效*/
    height: calc(100% + 20px);
    background: inherit;
    box-shadow: 0 0 0 200px rgba(255, 255, 255, 0.2) inset;
    z-index: -1;
    filter: blur(6px);
    overflow: hidden;
  }
  .button-grow {
    color: #65b5f6;
    background-color: transparent;
    border: 1px solid #65b5f6;
    border-radius: 4px;
    padding: 0 16px;
    height: 36px;
    width: 120px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .button-grow:hover {
    transform: scale(1.1);
  }
}
</style>
