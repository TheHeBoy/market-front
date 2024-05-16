<template>
  <div class="flex items-center justify-center">
    <el-tooltip :content="t('change lang')" placement="top">
      <button class="icon-btn mx-2" @click="toggleLocales()">
        <i-la-language class="icon-footer"/>
      </button>
    </el-tooltip>

    <el-tooltip :content="t('method to using')" placement="top">
      <router-link class="icon-btn mx-2" to="/process">
        <i-ri-article-line class="icon-footer"/>
      </router-link>
    </el-tooltip>

    <el-tooltip content="GitHub" placement="top">
      <a class="icon-btn mx-2" href="https://github.com/nekobc1998923/vitecamp" target="_blank" title="GitHub">
        <i-akar-icons-github-fill class="icon-footer"/>
      </a>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">

const {t, availableLocales, locale} = useI18n();
const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<style lang="scss">
.icon-footer {
  font-size: 1.3em;
}
</style>
