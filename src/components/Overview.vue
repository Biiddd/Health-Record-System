<script setup lang="ts">
import {ref, onMounted} from "vue";
import http from "@/http.js";
import dayjs from "dayjs";

const dataSource = ref([]);
const lastCheckDate = ref("");
const last_weight = ref("")
const last_weight_date = ref("")


const blood_columns = [
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

const tumor_columns = [
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
  http
      .get("/latest")
      .then((response) => {
        const rawData = response.data.msg;
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
  <a-row :gutter="[16, 48]" style="margin-bottom: 20px">
    <a-col :span="24">
      <span class="common-text"> 今天是 {{ dayjs().format("YYYY-MM-DD") }} </span>
    </a-col>
  </a-row>
  <a-row :gutter="[16, 48]">
    <a-col :span="12">
      <a-card title="近两次化验概览" style="width: 600px">
        <p>最近体重{{ last_weight }} 称重日期：{{ last_weight_date }}</p>
        <div>化验日期：{{ lastCheckDate }}</div>
        <div class="last-check-data">
          <a-table
              :dataSource="dataSource"
              :columns="tumor_columns"
              :pagination="false"
              style="background-color: rgba(255, 255, 255, 0.2)"
              bordered: true
          />
        </div>
        <div>化验日期：{{ lastCheckDate }}</div>
        <div class="last-check-data">
          <a-table
              :dataSource="dataSource"
              :columns="tumor_columns"
              :pagination="false"
              style="background-color: rgba(255, 255, 255, 0.2)"
              bordered: true
          />
        </div>
      </a-card>
    </a-col>

    <a-col :span="12">
      <a-card title="当前用药方案" style="width: 600px">
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </a-col>
  </a-row>

</template>

<style scoped>
.common-text {
  font-size: 32px;
  font-weight: bolder;
  padding-bottom: 20px;
}

.last-check-data {
  padding: 20px;
}
</style>
