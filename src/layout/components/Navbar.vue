<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 用户头像 -->
          <img :src="avatar" class="user-avatar">
          <!-- 用户角色 -->
          <span>{{ username }}</span>
          <i class="el-icon-setting" />
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="updatePassword">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <!-- 修改密码 对话框 -->
    <!-- 注意这个弹出层需要放置在最外层div的上一层级 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="updatePasswordForm" ref="updatePasswdRef" :rules="updatePasswdRules">
        <el-form-item label="原密码:" prop="oldPassword">
          <el-input v-model="updatePasswordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="updatePasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="confirmNewPassword">
          <el-input v-model="updatePasswordForm.confirmNewPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="confiremUpdatePassword">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      // 弹出层
      dialogFormVisible: true,
      // 更新密码表单
      updatePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      // 密码校验规则
      updatePasswdRules: {
        oldPassword: [
          {
            required: true,
            message: '请输入原密码！',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '密码的长度为6-12',
            trigger: 'blur'

          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码！',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '密码的长度为6-12',
            trigger: 'blur'

          }
        ],
        confirmNewPassword: [
          {
            required: true,
            message: '请再次输入新密码！',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 12,
            message: '密码的长度为6-12',
            trigger: 'blur'

          }
        ]
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 修改密码
    updatePassword() {
      // 打开弹出层
      this.dialogFormVisible = true
    },
    // 确认修改密码
    confiremUpdatePassword() {
      // 表单验证

      // 调用接口修改密码
      // 
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;


        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        span {
          cursor: pointer;
          margin: 0px 5px;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
