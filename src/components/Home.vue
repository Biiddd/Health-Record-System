<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo"/>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
              v-model:selectedKeys="selectedKeys2"
              v-model:openKeys="openKeys"
              mode="inline"
              style="height: 100%"
          >

            <router-link to="/Overview">
              <a-menu-item key="1">
                <user-outlined />
                <span>概况</span>
              </a-menu-item>
            </router-link>

            <router-link to="/inputdata">
              <a-menu-item key="2">
                <user-outlined />
                <span>数据录入</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/ca125' }" tag="div" class="custom-menu-item">
              <a-menu-item key="3">
                <user-outlined />
                <span>CA125</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/ca199' }" tag="div" class="custom-menu-item">
              <a-menu-item key="4">
                <user-outlined />
                <span>CA199</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/cea' }" tag="div" class="custom-menu-item">
              <a-menu-item key="5">
                <user-outlined />
                <span>CEA</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/ca153' }" tag="div" class="custom-menu-item">
              <a-menu-item key="6">
                <user-outlined />
                <span>CA153</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/ca724' }" tag="div" class="custom-menu-item">
              <a-menu-item key="7">
                <user-outlined />
                <span>CA724</span>
              </a-menu-item>
            </router-link>

            <router-link :to="{ path: '/charts/he4' }" tag="div" class="custom-menu-item">
              <a-menu-item key="8">
                <user-outlined />
                <span>HE4</span>
              </a-menu-item>
            </router-link>

          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Copyright © 2024 Biid
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const router = useRouter();
console.log('s2',selectedKeys2.value)


</script>


<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 24px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

/* 在你的样式表中添加如下的样式规则 */
.custom-menu-item {
  margin-bottom: 10px; /* 设置按钮之间的下边距 */
}
.logo {
  width: 90px; /* 设置 logo 的宽度 */
  height: 90px; /* 设置 logo 的高度 */
}

.logo img {
  width: 100%; /* 让图片充满 logo 容器 */
  height: auto; /* 让高度自适应 */
  transform: scale(0.8); /* 缩小图片至原尺寸的一半 */
}

.content {
  padding: 20px; /* 设置右侧内容区域的内边距 */
}
</style>
