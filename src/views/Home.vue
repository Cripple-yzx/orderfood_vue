<template>
  <div class="bg">
    <div class="container" v-if="show">
      <el-carousel height="calc(100vh-50%)">
        <el-carousel-item :key="1">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/banner1.jpg')})`,
            }"
          ></div>
        </el-carousel-item>
        <el-carousel-item :key="2">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/banner2.jpg')})`,
            }"
          ></div>
        </el-carousel-item>
        <el-carousel-item :key="3">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/banner3.jpg')})`,
            }"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <h3 style="margin: 10px; text-align: center">Recommended New Cuisine</h3>
      <h5 style="margin: 10px; text-align: center">家常菜品推荐</h5>
      <div
        style="background: #000; margin: 0px 5%; width: 90%; height: 2px"
      ></div>
      <el-row>
        <el-col
          v-for="(food, index) in menulist.slice(0, 3)"
          :key="index"
          :span="2"
        >
          <el-card v-for="(foods, id) in food.dish.slice(0, 5)" :key="id">
            <div @click="showdish(food.type, foods.id)">
              <img :src="foods.icon" class="image" />
              <div>
                <div class="name">
                  {{ foods.name }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 菜品显示 -->
    <div class="outside_to" v-else>
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
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import axios from "axios";
import { useCartStore } from "../store/store.js";
// import dishdetails from "./dishdetails.vue";
// const currentDate = ref(new Date());
export default {
  name: "myhome",
  data() {
    return {
      menulist: [],
      dishList: [],
      pron: {
        name: "",
        price: 0,
        description: "",
        icon: "",
        num: 1,
        check: true,
      },
      dish: [],
      show: true,
    };
  },
  methods: {
    showdish(type, id) {
      console.log("showdish方法调用，type为：", type);
      console.log("showdish方法调用，id为：", id);
      this.pron.storename = this.menulist[type - 1].storename;
      this.pron.name = this.menulist[type - 1].dish[id - 1].name;
      this.pron.price = this.menulist[type - 1].dish[id - 1].price;
      this.pron.description = this.menulist[type - 1].dish[id - 1].description;
      this.pron.icon = this.menulist[type - 1].dish[id - 1].icon;
      console.log("this.pron");
      console.log(this.pron);
      this.show = !this.show;
    },
    addshopping() {
      this.dishList.push(this.pron);
      console.log(this.dishList);
      alert("成功加入购物车");
    },
  },
  created() {
    this.dishList = useCartStore().menuList;
    console.log(this.dish);
  },
  mounted() {
    axios
      .get("/webapi/menu/list")
      .then((res) => {
        this.menulist = res.data.data;
        console.log("数据返回成功");
        console.log(this.menulist);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
.bg {
  width: 100vw;
  height: calc(100vh - 70px);
}
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.el-row {
  width: 90vw;
  height: 50vh;
  margin: 0 auto;
  background-color: #fff;
}
.el-col-2 {
  max-width: none;
  width: 90vw !important;
  height: 220px !important;
  display: flex;
  margin-top: 10px;
  z-index: 2;
  background-color: #fff;
}
.el-col-offset-5 {
  margin-left: 0%;
}
.el-card.is-always-shadow {
  width: 200px;
  height: 220px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fff;
}

.el-card {
  --el-card-border-color: var(--el-border-color-light);
  --el-card-border-radius: 4px;
  --el-card-padding: 0px 3px;
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
// 菜品显示
.outside_to {
  width: 60vw;
  height: 300px;
  display: block;
  margin-left: 20vw;
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
