<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 属性unique-opened意思是点击一级菜单的时候该一级菜单唯一展开，之前展开的会关上。属性collapse，决定是否水平收起菜单  collapse-transition, 决定是否开启折叠动画，默认为true。属性router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转  default-active:当前激活菜单的 index-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 如果index相同，则点一个，其余所有的都会跟着展开,所以需要动态绑定，同时这个index只能接收字符串，所以需要给item.id拼接一个空字符串-->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 index就是说当点击这个二级菜单的时候，会跳转到index里面的这个路径中去-->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符，用来放welcome子组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      //这个存储的是左侧菜单数据
      menulist: [],
      iconsObj: {
        //这里面的键值对中的键是res中的每个一级菜单的id
        125: "iconfont icon-morentouxiang",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju-tianchong",
        145: "iconfont icon-baobiao",
      },

      isCollapse: false, //是否折叠
      activePath: "", //被激活的链接地址
    };
  },
  created() {
    //整个页面刚一加载的时候就立即获取左侧菜单
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      //清空token
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push("/login");
    },

    //获取所有的左侧菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("res.meta.msg");
      }
      this.menulist = res.data;
    },

    //点击按钮，切换菜单的折叠与展开  el-menu提供了一个属性collapse，决定是否水平收起菜单  提供了一个collapse-transition, 决定是否开启折叠动画，默认为true
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    //保存链接的激活状态，为的是，当点击了一个二级标题，再次刷新的时候，此点击的二级标题依然是高亮的状态，这样就必须将激活的状态保存找到session中
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath; //这句话的意思是点击了其他的二级标题，马上为activePath赋上现在点击的路径的值
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
img {
  width: 100px;
  height: 80px;
}
.iconfont {
  margin-right: 8px;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>