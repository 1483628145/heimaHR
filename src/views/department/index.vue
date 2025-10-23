<template>
  <div class="container">
    <div class="app-container">
      <!-- 树形结构 -->
      <el-tree :data="departmentList" :props="defaultProps">
        <!-- 使用vue模板作为数据传递给下面 -->
        <template v-slot="{ data }">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="manager">{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
export default {
  name: 'department',
  data() {
    return {
      departmentList: [
        {
          name: '创智教育',
          managerName: '管理员',
          children: [
            { name: '张三', managerName: "李四" }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    async getList() {
      const res = await getDepartmentList()
      console.log(res);
    },

  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.manager {
  margin-right: 10px;
}
</style>