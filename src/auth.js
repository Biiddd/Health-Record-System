import { reactive } from "vue";

// 定义用户状态对象，用于存储用户登录状态和信息
const userState = reactive({
  isLoggedIn: false, // 用户登录状态
  userInfo: null, // 用户信息
});

// 更新用户状态函数
export function updateUserState(isLoggedIn, userInfo) {
  userState.isLoggedIn = isLoggedIn;
  userState.userInfo = userInfo;
}

// 注销函数
export function setlogout() {
  // 注销逻辑
  userState.isLoggedIn = false;
  userState.userInfo = null;
}

// 检查用户是否登录
export function isUserLoggedIn() {
  return userState.isLoggedIn;
}

// 获取用户信息
export function getUserInfo() {
  return userState.userInfo;
}
