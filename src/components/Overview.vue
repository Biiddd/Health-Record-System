<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const dataSource = ref([]);
const lastCheckDate = ref("");

const columns = [
  {
    title: "CA125",
    dataIndex: "CA125",
    key: "CA125",
  },
  {
    title: "CA199",
    dataIndex: "CA199",
    key: "CA199",
  },
  {
    title: "CEA",
    dataIndex: "CEA",
    key: "CEA",
  },
  {
    title: "CA153",
    dataIndex: "CA153",
    key: "CA153",
  },
  {
    title: "CA724",
    dataIndex: "CA724",
    key: "CA724",
  },
  {
    title: "HE4",
    dataIndex: "HE4",
    key: "HE4",
  },
];

onMounted(() => {
  axios
    .get("http://localhost:33001/api/latest")
    .then((response) => {
      const rawData = response.data;
      lastCheckDate.value = rawData[0].date;

      const dataMap = {
        1: "CA125",
        2: "CA199",
        3: "CEA",
        4: "CA153",
        5: "CA724",
        6: "HE4",
      };

      const data = {};
      rawData.forEach((item) => {
        const columnKey = dataMap[item.item_id];
        if (columnKey) {
          data[columnKey] = item.value;
        }
      });

      dataSource.value = [data];
    })
    .catch((error) => {
      console.error("获取数据失败：", error);
    });
});
</script>

<template>
  <div class="main">
    <div style="font-size: 32px; font-weight: bolder; padding-bottom: 20px">
      上一次化验时间：{{ lastCheckDate }}
    </div>
    <div
      style="
        font-size: 32px;
        font-weight: bolder;
        padding-top: 30px;
        padding-bottom: 20px;
      "
    >
      上一次化验数据
    </div>
    <div style="padding: 20px; height: 80vh">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
