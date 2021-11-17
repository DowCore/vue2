<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About {{ $t("hello") }}</router-link>
      <el-select>
        <option name="1" value="1"></option>
      </el-select>
      <i class="el-icon-info"></i>
      {{ count }}
      <font-awesome-icon icon="user-secret" />
      <svg-icon data="@svg/document.svg"></svg-icon>
    </div>
    <router-view />
  </div>
</template>
<script>
import { add } from "lodash-es";
export default {
  data() {
    return {
      count: add(1, 1),
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
