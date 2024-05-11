<script setup>
import { cloneDeep } from "lodash-es";
import { onMounted, reactive, ref } from "vue";
import http from "@/http.js";
import {message} from "ant-design-vue";

const columns = [
  {
    title: "日期",
    dataIndex: "date",
    width: "18%",
    align: "center",
  },
  {
    title: "CA125",
    dataIndex: "ca125",
    width: "12%",
    align: "center",
  },
  {
    title: "CA199",
    dataIndex: "ca199",
    width: "12%",
    align: "center",
  },
  {
    title: "CEA",
    dataIndex: "cea",
    width: "12%",
    align: "center",
  },
  {
    title: "CA153",
    dataIndex: "ca153",
    width: "12%",
    align: "center",
  },
  {
    title: "CA724",
    dataIndex: "ca724",
    width: "12%",
    align: "center",
  },
  {
    title: "HE4",
    dataIndex: "he4",
    width: "12%",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "center",
  },
];

const fetchData = async () => {
  try {
    const response = await http.get("/data");
    dataSource.value = response.data;
  } catch (error) {
    //console.error("获取数据失败", error);
  }
};
const dataSource = ref([]);
const editableData = reactive({});
const edit = (check_id) => {
  editableData[check_id] = cloneDeep(
    dataSource.value.filter((item) => check_id === item.check_id)[0],
  );
};
const save = async (check_id) => {
  // 查找对应 check_id 的原始记录
  const originalRecord = dataSource.value.find((item) => check_id === item.check_id);

  const editedRecord = editableData[check_id];
  const modifiedData = {};
  for (const key in editedRecord) {
    if (editedRecord[key] !== originalRecord[key]) {
      modifiedData[key] = editedRecord[key];
    }
  }
  // 如果没有任何修改，则不需要发送请求
  if (Object.keys(modifiedData).length === 0) {
    message.info("未修改任何数据", 5);
    delete editableData[check_id];
    return;
  }
  modifiedData.check_id = check_id;
  try {
    await http.post(`/updateData`, modifiedData);
    // 更新 dataSource 中的记录
    Object.assign(originalRecord, modifiedData);
    message.success("修改成功", 5);

    delete editableData[check_id];
  } catch (error) {
    message.warn("修改失败，请检查网络连接！", 5);
  }
};

const cancel = (check_id) => {
  delete editableData[check_id];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div style="height: 100%;">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ y: 450 }"
      bordered
      style="font-size: 16px; font-weight: 550;"
    >
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="
            ['ca125', 'ca199', 'cea', 'ca153', 'ca724', 'he4'].includes(
              column.dataIndex,
            )
          "
        >
          <div>
            <a-input
              v-if="editableData[record.check_id]"
              v-model:value="editableData[record.check_id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.check_id]">
              <a-typography-link @click="save(record.check_id)"
                >保存</a-typography-link
              >
              <a-popconfirm title="取消修改?" @confirm="cancel(record.check_id)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.check_id)">修改</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
