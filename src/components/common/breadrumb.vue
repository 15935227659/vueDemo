<template>
<el-col :span="24" class="breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</el-col>
</template>

<script>
export default {

}
</script>

<style>
.breadcrumb{
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>
