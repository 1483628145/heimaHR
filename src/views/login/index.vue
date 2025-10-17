<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <!-- 使用form表单icon -->
      <!-- <svg-icon icon-class="form"></svg-icon> -->
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <!-- el-form > el-form-item > el-input -->
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
          <!-- 手机号 -->
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 密码 show-password 可以显示和隐藏密码 -->
          <el-form-item prop="passwd">
            <el-input v-model="loginForm.passwd" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 使用协议 -->
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">用户使用协议</el-checkbox>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button style="width: 350px;" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>

export default {
  name: "Login",
  data() {
    return {
      // 登录表单
      loginForm: {
        mobile: '13800000002',
        passwd: 'itHeiMa@20251016',
        isAgree: false
      },
      // 登录表单校验
      loginRules: {
        mobile: [
          // 需要俩个校验规则，一个是必须输入，另一个是格式校验
          // 必须输入
          {
            required: true,
            message: '请输入手机号',
            // 失去焦点的时候触发校验规则
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '输入的手机号格式不正确',
            trigger: 'blur'
          }
        ],
        passwd: [
          // 必须输入密码
          {
            required: true,
            message: '请输入密码',
            // 失去焦点的时候触发校验规则
            trigger: 'blur'
          },
          // 设置长度
          {
            min: 6,
            max: 16,
            message: '密码长度应该是6-12位之间',
            trigger: 'blur'
          }
        ],
        isAgree: [{
          // required 只能检测 undefined '' null 这三种情况
          // 所以在这里使用自定义函数来做校验
          validator: (rule, value, callback) => {
            // rule 校验规则
            // value 校验的值
            // callback 函数 执行代表说明成功 失败的话需要new一个失败对象，然后放失败信息
            value ? callback() : callback(new Error('你必须勾选使用协议！'))
          }
        }

        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      // 登录之前对表当进行整体校验
      // 里面有一个回调函数，通过这个回调函数里面的isOK来检验是否通过整体表单校验
      // 使用ref拿到整体的表单对象
      this.$refs.loginRef.validate((isOk) => {
        if (isOk) {
          // 通过表单校验
          // alert('校验通过')
          this.$store.dispatch('user/login', this.loginForm)
        }
      })
    }
  },
};
</script>


<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
