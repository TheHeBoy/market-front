<script setup lang="ts"></script>

<template>
  <div class="h-full flex flex-col">
    <the-header class="flex-none" />
    <div class="p-5 flex-grow">
      <el-config-provider>
        <router-view></router-view>
      </el-config-provider>
    </div>
    <the-footer class="flex-none h-10" />
  </div>
</template>
