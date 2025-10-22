<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="departmentList" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
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
      console.log(res);
    },

  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped></style>