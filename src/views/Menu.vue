<template>
  <div class="backgd">
    <!-- 左边栏 -->
    <div class="left-menu">
      <el-row>
        <el-col :span="5">
          <!-- default-active="1"  index="1" active-text-color="#409EFF"-->
          <el-menu
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            style="
              --el-menu-text-color: #000 !important;
              --el-menu-bg-color: #fff !important;
              --el-menu-hover-text-color: #ccc !important;
              --el-menu-hover-bg-color: #fff !important;
            "
          >
            <el-menu-item
              v-for="(food, index) in menulist"
              :key="index"
              @click="getshow(food.type)"
            >
              <el-icon><Menu /></el-icon>
              <span> {{ food.storename }} </span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- 右边栏 -->
    <div class="right-menu_one" v-if="show">
      <!--位置  -->
      <div class="top">
        <div class="position">
          <span>当前位置：食堂美食</span>
        </div>
        <div class="rod">
          <div class="mt-4">
            <el-input
              v-model="input3"
              placeholder="菜品名称"
              class="input-with-select"
            >
              <template #prepend>
                <el-select
                  v-model="select"
                  placeholder="菜品分类"
                  style="width: 115px"
                  @clear="select = ''"
                >
                  <el-option
                    v-for="store in menulist"
                    :label="store.title"
                    :value="store._id"
                    :key="store._id"
                  />
                </el-select>
              </template>
              <template #append>
                <el-icon @click="findDish()"><Search /></el-icon>
              </template>
            </el-input>
          </div>
        </div>
        <!-- 菜品展示 -->
        <el-row>
          <el-col
            v-for="(foods, id) in storage"
            :key="id"
            :span="2"
            :offset="index > 0 ? 4 : 0"
            @click="showdish(foods.id)"
          >
            <el-card>
              <img :src="foods.icon" class="image" />
              <div>
                <div class="price">￥{{ foods.price }}</div>
                <div class="name">{{ foods.name }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 详细图片 -->
    <div class="right-menu_one" v-else>
      <!-- 位置 -->
      <div class="top">
        <div class="position">
          <span>当前位置：食堂美食/{{ pron.storename }}/{{ pron.name }}</span>
        </div>
        <div class="rod"></div>
      </div>
      <!-- 菜品展示 -->
      <div class="outside_to">
        <div class="pic_to">
          <img :src="pron.icon" class="img" />
        </div>
        <div class="details">
          <div class="pname">
            <span class="span_name">菜品名称：</span>
            <span class="span_infor">{{ pron.name }}</span>
          </div>

          <div class="pprice">
            <span class="span_name">价格：</span>

            <span class="span_infor">￥{{ pron.price }}</span>
          </div>
          <div>
            <span class="span_name">菜品分类：</span>
            <span class="span_infor">{{ pron.storename }}</span>
          </div>
          <div>
            <span class="span_name">描述:</span>
            <span class="span_infor">{{ pron.description }}</span>
          </div>
          <div>
            <span class="span_name">分量：</span>
            <span class="span_infor">标准</span>
          </div>
          <div>
            <span class="span_name">购买数量：</span>
            <button :disabled="pron.num === 0" @click="pron.num--">
              <el-icon><Minus /></el-icon>
            </button>
            <span style="width: 20px">{{ pron.num }}</span>
            <button @click="pron.num++">
              <el-icon><Plus /></el-icon>
            </button>
          </div>
          <el-row class="mb-4">
            <el-button type="primary" @click="addshopping()" class="addshopping"
              >加入购物车</el-button
            >
            <el-button type="primary" @click="show = true" class="return"
              >返回</el-button
            >
            <!-- <button @click="show = true" class="return">返回</button> -->
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../store/store.js";
import axios from "axios";
export default {
  name: "MenuPage",
  data() {
    return {
      menulist: [], //将数据库的数据全部放进menulist
      storage: [], //将选中的菜品的信息放进storage
      picList: [], //pinia使用的中间存放信息的
      pron: {
        storename: "",
        name: "",
        price: 0,
        description: "",
        icon: "",
        num: 1,
        check: true,
      }, //图片详细信息
      indexs: 0,
      input3: "", //搜索框部分
      select: "",
      show: true,
    };
  },
  methods: {
    getshow(index) {
      this.storage = this.menulist[index - 1].dish;
      console.log("storage");
      console.log(this.storage);
      this.indexs = index;
      // console.log(this.indexs);
    },
    showdish(id) {
      this.pron.storename = this.menulist[this.indexs - 1].storename;
      this.pron.name = this.menulist[this.indexs - 1].dish[id - 1].name;
      this.pron.price = this.menulist[this.indexs - 1].dish[id - 1].price;
      this.pron.description =
        this.menulist[this.indexs - 1].dish[id - 1].description;
      this.pron.icon = this.menulist[this.indexs - 1].dish[id - 1].icon;
      console.log(this.pron);
      this.show = !this.show;
    },
    addshopping() {
      this.picList.push(this.pron);
      alert("成功加入购物车");
      // this.$router.push("/shopping");
    },
  },
  created() {
    this.picList = useCartStore().menuList;
  },
  mounted() {
    axios
      .get("/webapi/menu/list")
      .then((res) => {
        console.log("数据返回成功");
        this.menulist = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.backgd {
  width: 100vw;
  height: 100vh;
  position: relative;
  /* left: 10vw; */

  background-color: white;
}
/* 左边栏 */
.left-menu {
  width: 15vw;
  height: 100vh;
  position: absolute;
  background-color: #fff;
}
.bradius {
  width: 200px;
  height: 50px;
  font-size: 30px;
  font-family: NSimSun;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
}
.el-menu-vertical-demo {
  width: 200px;
  box-shadow: 1px 0px 3px #000;
  z-index: 999;
}
.router-link-active .router-link-exact-active {
  color: #fff;
}
/* 右边栏 */
.right-menu_one {
  width: 85vw;
  height: 100vh;
  position: absolute;
  left: 15vw;
  float: right;
  background-color: #fff;
}
/* 位置 */
.top {
  width: 100%;
  height: 52px;
  color: #000;
  /* bottom: 5px; */
}
.position {
  width: 100%;
  height: 20px;
  text-align: right;
  font-family: "宋体";
  font-size: 14px;
  background-color: #fff;
}
.rod {
  width: 100%;
  height: 32px;
  /* background-color: #ccc; */
}
.mt-4 {
  width: 300px;
  height: 32px;
  float: right;
}
.input-with-select {
  width: 300px;
}
.input-with-el-select {
  width: 150px;
}
.el-input-group__append {
  width: 50px;
}
.infor {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.storename {
  width: 100%;
  height: 100px;
  color: aqua;
}
.el-row {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
.el-col-2 {
  max-width: none;
  width: 200px !important;
  height: 220px !important;
  display: flex;
  margin-top: 10px;
  margin-left: 40px;
  z-index: 2;
  background-color: #fff;
}

.el-card .is-always-shadow {
  width: 200px;
  height: 220px;
  margin: 10px 30px 10px 10px;
}
.el-card {
  --el-card-border-color: var(--el-border-color-light);
  --el-card-border-radius: 4px;
  --el-card-padding: 0px 10px;
  --el-card-bg-color: var(--el-fill-color-blank);
}
.el-card__body {
  padding: var(--el-card-padding);
}
.image {
  width: 180px;
  height: 180px;
  /* width: 100%; */
  display: block;
}
.name {
  width: 200px;
  height: 20px;
  font-size: 13px;
  font-family: "宋体";
  color: #000;
  text-align: center;
  line-height: 20px;
}
.price {
  width: 200px;
  height: 20px;
  color: #fd0404;
  text-align: center;
}
/* 图片详情 */
.outside_to {
  width: 70%;
  height: 300px;
  display: block;
  margin-left: 150px;
  margin-top: 10px;
  background-color: #fff;
  /* border: 1px solid #ffd04b; */
  box-shadow: 1px 1px 3px #000;
  z-index: 999;
}
.pic_to {
  width: 300px;
  height: 300px;
  padding: 5px;
  float: left;
}
.img {
  width: 290px;
  height: 290px;
}
.details {
  width: 280px;
  height: 279px;
  float: right;
  margin-top: 12px;
  margin-right: 10px;
  text-align: left;
  background-color: #fff;
}
.details div {
  width: 100%;
  height: 35px;
  padding-left: 10px;
}
.span_name {
  width: 100px;
  height: 30px;
  font-size: 15px;
  font-family: "宋体";
  text-align: left;
  line-height: 30px;
}
.span_infor {
  width: 130px;
  height: 30px;
  float: right;
  margin-right: 60px;
  font-size: 15px;
  font-family: "宋体";
  line-height: 30px;
}
el-icon {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  background-color: #ffd04b;
}
.mb-4 {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  /* background-color: #545c64; */
}
.addshopping {
  width: 100px;
  height: 30px;
}
.return {
  width: 100px;
  height: 30px;
}
</style>
