<script setup>
import { cloneDeep } from "lodash-es";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const columns = [
  {
    title: "日期",
    dataIndex: "date",
    width: "20%",
  },
  {
    title: "CA125",
    dataIndex: "ca125",
    width: "12%",
  },
  {
    title: "CA199",
    dataIndex: "ca199",
    width: "12%",
  },
  {
    title: "CEA",
    dataIndex: "cea",
    width: "12%",
  },
  {
    title: "CA153",
    dataIndex: "ca153",
    width: "12%",
  },
  {
    title: "CA724",
    dataIndex: "ca724",
    width: "12%",
  },
  {
    title: "HE4",
    dataIndex: "he4",
    width: "12%",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];

const fetchData = async () => {
  try {
    const response = await axios.post("http://localhost:33001/api/data");
    dataSource.value = response.data;
  } catch (error) {
    console.error("获取数据失败", error);
  }
};
const dataSource = ref([]);
const editableData = reactive({});
const edit = (key) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0],
  );
};
const save = (key) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key],
  );
  delete editableData[key];
};
const cancel = (key) => {
  delete editableData[key];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template
        v-if="
          ['date', 'ca125', 'ca199', 'cea', 'ca153', 'ca724', 'he4'].includes(
            column.dataIndex,
          )
        "
      >
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)"
              >保存</a-typography-link
            >
            <a-popconfirm
              title="确定修改这条数据?"
              @confirm="cancel(record.key)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">修改</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
