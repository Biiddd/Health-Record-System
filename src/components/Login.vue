<template>
  <div class="login">
    <div class="login-box">
      <div class="top">
        <div class="logo">
<!--          <img-->
<!--              src="~@/assets/img/LB-logo.png"-->
<!--              alt=""-->
<!--          >-->
        </div>
      </div>
      <div class="mid">
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              class="custom-label"
              label="用户名"
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
              label="密码"
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 10, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
            <div class="item-btn">
              <a-button type="primary" html-type="submit">登录</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="bottom">
        Copyright © 2024 Biid
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Home from "@/components/Home.vue";
const router = useRouter();

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const correctUsername = '1'; // 正确的用户名
const correctPassword = '1';
const onFinish = () => {
  if(formState.username !== correctUsername || formState.password !== correctPassword){
    alert('用户名或密码错误');
    return;
  }
  console.log('密码正确')
  router.push({name:'Home'});
  console.log(router);

};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.png') no-repeat;
  background-size: cover;
  position: fixed;
  .login-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    padding-top: 10%;
    .top {
      margin-bottom: 30px;
      text-align: center;
      .logo {
        font-size: 0;
        max-width: 50%;
        margin: 0 auto;
      }
      &:deep(.company) {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .mid {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item-btn {
        width: 410px;
        margin-top: 20px;
        input {
          border: 0;
          width: 100%;
          height: 40px;
          background: #1f87e8;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 10%;
      width: 100%;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
}
.info {
  width: 410px;
}
:deep(.login-captcha) {
  height: 40px;
}
</style>