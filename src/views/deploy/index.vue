<template>
  <el-card class="w-100 m-auto">
    <template #header>
      <div class="header">
        <span>MSC-20 Deploy</span>
      </div>
    </template>
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Protocol" prop="protocol">
        <el-input v-model="form.protocol" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="Tick" prop="tick">
        <el-input v-model="form.tick" :maxlength="18" show-word-limit auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Total Supply" prop="totalSupply">
        <el-input-number :controls="false" v-model="form.totalSupply" class="!w-80" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="Limit Per Mint" prop="limitPerMint">
        <el-input-number :controls="false" v-model="form.limitPerMint" class="!w-80" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item class="w-full">
        <el-button type="primary" size="large" class="w-full" @click="submitForm(ruleFormRef)">Deploy</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {inscribeDeploy} from '@/utils/inscribe';

const form = ref({
  protocol: 'ASC-20',
  tick: '',
  totalSupply: 0,
  limitPerMint: 0,
});
const ruleFormRef = ref();

// 定义验证规则
const rules = reactive({
  tick: [{required: true, message: 'Please input tick name', trigger: 'blur'}],
  totalSupply: [
    {required: true, message: 'Total Supply cannot be empty', trigger: 'change'},
    {type: 'number', min: 1, message: 'Total Supply must be greater than 0', trigger: 'change'},
  ],
  limitPerMint: [
    {required: true, message: 'Limit Per Mint cannot be empty', trigger: 'change'},
    {type: 'number', min: 1, message: 'Limit Per Mint must be greater than 0', trigger: 'change'},
  ],
});

const submitForm = async (formEl?) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const ins = form.value;

      if (ins.limitPerMint > ins.totalSupply) {
        ElMessage.error('Limit Per Mint cannot be greater than Total Supply');
        return;
      }

      inscribeDeploy(ins.tick, ins.totalSupply, ins.limitPerMint).then((res) => {
        ElMessage.success('Deployed successfully');
      }).catch((err) => {
        ElMessage.error('Deploy failed');
      });
    }
  });
};


</script>

<style scoped lang="scss">
</style>
