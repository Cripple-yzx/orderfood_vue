<template>
  <div class="backgd">
    <!-- v-for循环出菜品 -->
    <div class="tables">
      <table border="0" cellspacing="0">
        <thead>
          <tr>
            <th>勾选</th>
            <th>图片</th>
            <th>菜名</th>
            <th>单价</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pron, index) in menulist" :key="index" class="dishtable">
            <td><input type="checkbox" checked="checked" /></td>
            <td><img :src="pron.icon" class="picon" /></td>
            <td>{{ pron.name }}</td>
            <td>￥{{ pron.price }}</td>
            <td>
              <button
                :disabled="pron.num === 0"
                @click="pron.num--"
                class="add"
              >
                <el-icon><Minus /></el-icon>
              </button>
              {{ pron.num }}
              <button @click="pron.num++" class="jian">
                <el-icon><Plus /></el-icon>
              </button>
            </td>
            <td>
              <button @click="deleteBook(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="payment">
      <div class="money">
        <span class="TotalPrice">￥{{ totalPrice }}</span>
      </div>
      <el-row class="mb-4">
        <el-button type="danger" @click="sendData">付款</el-button>
      </el-row>
    </div>
    <div class="payments" v-if="show">
      <div class="payments_way">
        <div class="fork" @click="fork()">
          <el-icon><Close class="close" /></el-icon>
        </div>
        <div class="Price">
          <span class="Merchant">食堂店铺商户</span>
          <div class="price_num">￥{{ totalPrice }}</div>
        </div>
        <div class="remit">
          <span class="remit_left">付款方式</span>
          <div class="remit_right">
            <img src="../assets//weixin.png" class="wxpic" />
            <div class="weixin">微信</div>
          </div>
        </div>
        <div class="button">
          <el-row class="mb-4">
            <!-- <el-button>Default</el-button> -->
            <el-button type="success" class="success">支付</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// 引入 useCartStore
import { useCartStore } from "../store/store.js";
export default {
  name: "shopping",
  data() {
    return {
      menulist: [],
      orderList: [],
      checked: true,
      show: false,
    };
  },
  methods: {
    deleteBook(index) {
      console.log(index);
      this.menulist.splice(index, 1);
    },

    sendData() {
      var order = this.menulist;
      this.orderList.push(order);
      console.log("order");
      console.log(order);
      console.log(this.orderList);
      axios
        .post("/webapi/menu/order", this.orderList)
        .then((res) => {
          console.log("数据提交成功", res);
          this.menulist = [];
        })
        .catch((err) => {
          console.log(err);
          console.log("数据提交失败");
        });
      this.show = !this.show;
    },
    fork() {
      this.show = !this.show;
    },
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      //遍历数组，计算总价
      this.menulist.forEach((check) => {
        if (check.check) {
          totalPrice = totalPrice + check.price * check.num;
          console.log(totalPrice);
        }
      });
      console.log("总" + totalPrice);
      return totalPrice;
    },
  },
  created() {
    //获取 Store 实例对象
    this.store = useCartStore(); //获取 cartStore.cartList 的地址
    this.menulist = this.store.menuList;
    console.log(this.menulist);
    console.log("store 的 menulist");
    console.log(this.store.menuList);
    // this.store.menuList = [];
    //     this.cartList=useCartStore().cartList
  },
};
</script>
<style scoped>
/* 背景 */
.backgd {
  width: 100vw;
  height: calc(100vh - 100px);
  margin: 0 auto;
  margin-top: 10px;
  /* background-color: aquamarine; */
}
.tables {
  width: 90.5vw;
  height: calc(100vh - 120px); /* 占据除支付区域之外的整个屏幕高度。 */
  margin: 0 auto;
  /* background-color: antiquewhite; */
  overflow-y: auto; /* 内容超过可视区域时显示滚动条。 */
}
table {
  width: 90vw;
  height: 100px;
  /* margin: 0 auto; */
}
thead {
  width: 90vw;
  height: 5vh;
  /* padding: 0 auto; */
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #000;
  /* position: fixed; */
}
th {
  width: 10vw;
  height: 50px;
}
tbody {
  width: 90vw;
  height: 100px;
}
.dishtable {
  width: 90vw;
  height: 100px;
  /* padding: 0 auto; */
  /* margin: 5px 0px; */
  /* box-shadow: 1px 1px 3px #000; */
  /* background-color: aquamarine; */
}
td {
  width: 10vw;
  height: 100px;
  text-align: center;
  padding-top: 4px;
}
.picon {
  width: 10vw;
  height: 100px;
}

.payment {
  width: 90.5vw;
  height: 50px;
  margin-left: 4.7vw;
  position: fixed;
  /* bottom: 10px; */
  background-color: antiquewhite;
}
.money {
  width: 20.5vw;
  height: 100px;
  float: left;
}
.TotalPrice {
  width: 10vw;
  height: 50px;
  position: absolute;
  left: 20px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  color: #fd0202;
}
.mb-4 {
  width: 70vw;
  height: 100px;
  float: right;
}
.el-button {
  width: 10vw;
  height: 50px;
  position: absolute;
  right: 0px;
}
/* 支付方式 */
.payments {
  width: 100vw;
  height: 90vh;
  margin-left: -8px;
  position: fixed;
  top: 67px;
  z-index: 999;
  background: rgba(7, 7, 7, 0.6);
}
.payments_way {
  width: 40vw;
  height: 55vh;
  position: fixed;
  top: 30%;
  left: 30%;
  z-index: 999;
  background: #fff;
}
.fork {
  width: 100%;
  height: 30px;
}
.el-icon {
  width: 30px;
  height: 30px;
  float: right;
  right: 5px;
}
.close {
  width: 30px;
  height: 30px;
}
.Price {
  width: 100%;
  height: 100px;
  margin-top: 30px;
  text-align: center;
}
.Merchant {
  font-size: 25px;
  font-family: "宋体";
}
.price_num {
  margin-top: 20px;
  font-size: 25px;
  font-family: "宋体";
}
.remit {
  width: 100%;
  height: 50px;
  /* background: #ccc; */
  border-top: 0.1px solid #000;
}
.remit_left {
  width: 30%;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  font-size: 20px;
  font-family: "宋体";
}
.remit_right {
  width: 70%;
  height: 50px;
  float: right;
  text-align: right;
}
.wxpic {
  width: 30px;
  height: 30px;
  padding-top: 10px;
}
.weixin {
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-family: "宋体";
  line-height: 50px;
  margin-right: 10px;
  float: right;
}
.button {
  width: 100%;
  height: 50px;
  margin-top: 40px;
}
.success {
  right: 20%;
}
</style>
