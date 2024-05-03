<script setup>

</script>

<template>
  <div class="main">
    <div style="font-size: 32px; font-weight: bolder">
      上一次化验时间
    </div>
    <div style="font-size: 32px; font-weight: bolder">
      上一次化验数据
    </div>
    <div style="padding: 20px">
      <a-table :dataSource="dataSource" :columns="columns" />
    </div>
  </div>

</template>

<script>
export default {
  setup() {
    return {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
      ],

      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f0f2f5;
}

</style>