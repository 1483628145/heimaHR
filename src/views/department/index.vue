<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="departmentList" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot="{ node, data }" 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
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
import { ListToTreeData } from '@/utils'
export default {
  name: 'department',
  data() {
    return {
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  methods: {
    async getList() {
      const res = await getDepartmentList()
      ListToTreeData(res, 0)
      this.departmentList = res
      console.log(this.departmentList);

    },

  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 50px;
}

.manager {
  margin-right: 10px;
}
</style>