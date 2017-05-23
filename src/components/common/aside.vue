<template>
  <el-col :span="24" :class="collapsed?'menu-collapsed':'menu-expanded'">
      <!--展开的侧边栏-->
      <el-menu class="el-menu-vertical-demo" :default-active="onRouter"
        @select="handleselect" unique-opened router v-show="!collapsed">
        <template v-for="(item,index) in $router.options.routes"  v-if="!item.hidden">     
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item 
                    v-for="child in item.children" 
                    :index="child.path" 
                    :key="child.path" 
                   >
                {{child.name}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item 
                v-if="item.leaf&&item.children.length>0" 
                :index ="item.children[0].path">
                <i :class ="item.children[0].iconCls"> </i>
                {{item.children[0].name}}
            </el-menu-item>
        </template>
      </el-menu>
      <!--合起来的侧边栏-->
      <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
        <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
                <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
                    <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                </ul>
            </template>
            <template v-else>
                <li class="el-submenu">
                    <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                </li>
            </template>
        </li>
    </ul>
  </el-col>
</template>

<script>
export default {
    props:['collapsed'],

    computed: {
         onRouter(){
             //这里通过路由得到的侧边栏，注意设置默认样式时需要处理
             let routs = this.$route.path.split('/')
             return routs[routs.length-1]
      }
    },
    mounted(){
        console.log(this.collapsed)
         console.log(this.$route.path)
    },
    methods:{
        handleopen() {
			// console.log('handleopen');
         },
        handleclose() {
            // console.log('handleclose');
        },
        handleselect: function (a, b) {
             console.log(this.onRouter+"组件中")
             this.$emit('handleselect',this.onRouter)
            
        },
        showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
    }
}
</script>

<style>
.el-submenu__title{
    text-align:left;
    border-bottom : 1px solid #ccc;
}
.collapsed .el-submenu{
    position: relative;
}
.collapsed  .el-menu{
    position: absolute;
    display: none;
    z-index:999;
    left:60px;
    top:0;

}
.menu-expanded{
  /*flex-grow: 0;*/
  width:230px;
  padding:0px;
  min-width:230px;

  box-sizing: border-box;
  height:100%;
  background-color: #eef1f6;
}
.menu-collapsed{
    min-width:60px;
    max-width:60px;
    height:100%;
    background-color: #eef1f6;
}
</style>
