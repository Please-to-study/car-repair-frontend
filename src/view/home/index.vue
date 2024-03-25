<template>
  <el-row :gutter="20">
    <el-col :span="20" style="margin-top: 30px">
      <el-text style="font-size: 50px; " size="large">汽车维修预约网站</el-text>
    </el-col>
    <el-col :span="4">
      <el-row>
        <el-text style="font-size: 15px" >联系我们</el-text>
      </el-row>
      <el-row>
        <el-text style="font-size: 15px" >电话：18888888888</el-text>
      </el-row>
      <el-row>
        <el-text style="font-size: 15px" >地址：XX省XX市XX区XX路XX号</el-text>
      </el-row>
    </el-col>
  </el-row>

  <el-tabs type="border-card" class="scroll">
    <el-tab-pane label="预约首页">
      <el-container class="scroll">
<!--        <el-header></el-header>-->
        <el-container class="scroll">
          <el-aside width="600px">
            <el-card class="order-box-card">
              <template #header>
                <div class="card-header">
                  <span>维修预约</span>
                </div>
              </template>
              <el-form ref="orderForm" :model="orderFormData" :rules="orderRules" class="">
                <el-form-item label="预约时间" prop="orderDate">
                  <el-date-picker
                      v-model="orderFormData.orderDate"
                      type="datetime"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择维修时间"
                  />
                </el-form-item>
                <!--                <el-form-item label="电话" prop="userphone">-->
                <!--                  <el-input size="default" v-model="orderFormData.userphone" />-->
                <!--                </el-form-item>-->
                <el-form-item label="车牌" prop="plateNumber">
                  <el-input type="text" size="default" v-model="orderFormData.plateNumber" />
                </el-form-item>
                <el-form-item label="车型" prop="model">
                  <el-input type="text" size="default" v-model="orderFormData.model" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input size="default" v-model="orderFormData.phone" />
                </el-form-item>
                <el-form-item label="维修项目" prop="maintenanceProject">
                  <el-input size="default" v-model="orderFormData.maintenanceProject" />
                </el-form-item>
                <el-form-item label="故障描述" prop="problem">
                  <el-input type="textarea" size="default" v-model="orderFormData.problem" />
                </el-form-item>


                <el-form-item>
                  <el-button type="primary" class="buttonStyle" @click="handleMaintenanceOrder">预约</el-button>
                </el-form-item>
              </el-form>

            </el-card>
          </el-aside>
          <el-container>
            <el-main>
<!--              第一行-->
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-text class="mx-1" size="large" type="primary" tag="b">预约订单</el-text>
                  <el-table :data="orderList.data" style="width: 70%">
                    <el-table-column prop="orderDate" label="预约时间" />
                    <el-table-column prop="plateNumber" label="车牌"  />
                    <el-table-column prop="model" width="130" label="车型" />
                    <el-table-column prop="maintenanceProject" label="维修项目"  />
                    <el-table-column prop="workerName" label="维修师傅"  />
                    <el-table-column prop="maintenanceProgress" width="130" label="维修进度" />
                    <el-table-column show-overflow-tooltip prop="comment" label="评价信息" width="180"/>
                    <el-table-column  label="编辑">
                      <template #default="scope">
                        <!--                <el-button v-if="scope.row.commentFlag" link type="primary" size="small">评价</el-button>-->
                        <el-button v-if="scope.row.commentFlag" type="primary" :icon="Edit" @click="handleEvaluate(scope.row.id)" size="small"/>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>

              </el-row>

              <!--      第二行-->
              <el-row :gutter="20" style="margin-top: 50px">
                <el-col :span="24">
                  <el-text class="mx-1" size="large" type="primary" tag="b">维修师傅名单</el-text>
                  <el-table :data="workerList.data" style="width: 70%">
                    <el-table-column prop="name" label="名字" />
                    <el-table-column prop="phone" label="电话"  />
                    <el-table-column prop="age" width="130" label="年龄" />
                    <el-table-column prop="seniority" label="工龄"  />
                    <el-table-column prop="major" width="130" label="主修项目" />
                  </el-table>
                </el-col>

              </el-row>
            </el-main>
            <el-footer></el-footer>
          </el-container>
        </el-container>

        <el-dialog v-model="dialogVisible" title="评价">
          <el-input
              v-model="evaluateText"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入"
          />
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>
      </span>
          </template>
        </el-dialog>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="维修公告">
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="board in boardList.data" :key="board" class="infinite-list-item-new">
          <el-row>
            <el-text >公告标题：{{board.title}}</el-text>  <el-text style="margin-left: 20px">发布时间：{{board.time}}</el-text>
<!--            <el-button type="danger" style="margin-left: 50px" @click="handleDeleteBoard(board)"> 删除 </el-button>-->
          </el-row>
          <el-row>
            <el-text style="margin-left: -100px">{{board.context}}</el-text>
          </el-row>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="关于我们">

        <el-container>
          <el-header></el-header>
          <el-main>
            <el-text style="font-size: 20px;" size="large">
              XX汽车维修厂是一家专业从事汽车维修和保养服务的机构，位于交通便利的城市中心地带。自成立以来，XX维修厂一直致力于为顾客提供高品质、快捷的汽车维修服务，深受广大车主的信赖。

              我维修厂拥有一支经验丰富、技术精湛的专业团队，具备丰富的汽车维修经验和专业知识，能够应对各种复杂的汽车故障和维修需求。同时，XX维修厂与多家知名汽车零部件供应商建立了长期合作关系，确保维修所需的零部件质量和供应的可靠性。

              XX汽车维修厂提供各类汽车维修保养服务，包括发动机维修、底盘保养、刹车系统检测、空调系统清洁等。此外，还提供汽车故障诊断和排除服务，帮助车主解决各类汽车故障问题。

              在硬件设施方面，XX汽车维修厂拥有先进的汽车检修设备和工具，能够准确检测和修复汽车故障。同时，维修厂还注重环保，对废油、废液等废弃物进行妥善处理，确保符合环保标准。

              为方便客户，XX汽车维修厂提供预约服务，客户可以通过该网站预约指定时间进行维修。此外，还提供免费车辆检测和咨询服务，帮助客户了解车辆状况和日常维护要点。

              总之，XX汽车维修厂以其专业的技术团队、丰富的维修经验、先进的设备和良好的服务态度，为客户提供优质的汽车维修服务。如果您需要汽车维修保养服务，不妨选择XX维修厂，让您的爱车焕发青春活力。
            </el-text>
          </el-main>
          <el-footer></el-footer>
        </el-container>


    </el-tab-pane>
  </el-tabs>


</template>
<script>
import { useStore } from 'vuex'
import service from "../../utils/request"
import {ElMessage} from "element-plus";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";

export default {
  setup () {
    const store = useStore()
    const userInfo = store.getters["user/getInfo"]
    // const businessInfo = store.getters["businessINFO/getInfo"]
    // const couponInfo = {
    //   ...userInfo,
    //   ...businessInfo
    // }
    const orderList = reactive({
      data: []
    })

    const workerList = reactive({
      data: [
      ]
    })

    const boardList = reactive({
      data: [
      ]
    })


    const orderForm = ref(null)
    const orderFormData = reactive({
      userid: userInfo.userid,
      orderDate: '',
      maintenanceProject: '',
      problem: '',
      plateNumber: '',
      model: '',
      phone: '',
    })
    const evaluateData = reactive({
      id: '',
      userid: userInfo.userid,
      comment: '',
    });
    const dialogVisible = ref(false);
    const evaluateText = ref('')

    const handleEvaluate = (id) => {
      evaluateData.id = id;
      dialogVisible.value = true;
    }

    const handleCancel = () => {
      dialogVisible.value = false;
      evaluateText.value = "";
    }

    const handleSubmit = async () => {
      dialogVisible.value = false;
      evaluateData.comment = evaluateText.value;
      const res = await request('/order/comment', evaluateData)
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '评价成功',
          showClose: true,
        })
      }else {
        ElMessage({
          type: 'error',
          message: '评价失败',
          showClose: true,
        })
      }
      await getOrderList();
    }


    const orderRules = reactive({
      orderDate: [{ required: true, message: "请选择预约维修时间", trigger: 'blur' }],
      plateNumber: [{ required: true, message: "请填写车牌号", trigger: 'blur' }],
      model: [{ required: true, message: "请填写维修车型", trigger: 'blur' }],
      phone: [{ required: true, message: "请填写预约手机号", trigger: 'blur' }],
      maintenanceProject: [{ required: true, message: "请填写预约维修项目", trigger: 'blur' }],
      problem: [{ required: true, message: "请填写故障描述", trigger: 'blur' }],
    })

    const request = (url, data) => {
      return service({
        url: url,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    }

    const handleMaintenanceOrder = async () => {
      console.log(orderFormData.orderDate)
      const res = await request('/order/booking', orderFormData)
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '预约成功',
          showClose: true,
        })
        orderFormData.orderDate = '';
        orderFormData.maintenanceProject = '';
        orderFormData.phone = '';
        orderFormData.model = '';
        orderFormData.plateNumber = '';
        orderFormData.problem = '';
      }else {
        ElMessage({
          type: 'error',
          message: '预约失败',
          showClose: true,
        })
      }
      await getOrderList();
    }

    const getRequest = (url, id) => {
      if (id == null) {
        return service({
          url: url,
          method: 'get',
        })
      }
      return service({
        url: url,
        method: 'get',
        params: {
          userid: id
        }
      })
    }

    // const orderData = [
    //   {
    //     id: '1',
    //     orderDate: '2016-05-03',
    //     maintenanceProject: 'Tom',
    //     status: 0,
    //     comment: '',
    //   },
    //   {
    //     id: '2',
    //     orderDate: '2016-05-03',
    //     maintenanceProject: 'Tom',
    //     status: 1,
    //     comment: '',
    //   },
    //   {
    //     id: '3',
    //     orderDate: '2016-05-03',
    //     maintenanceProject: 'Tom',
    //     status: 2,
    //     comment: '',
    //   },
    //   {
    //     id: '4',
    //     orderDate: '2016-05-03',
    //     maintenanceProject: 'Tom',
    //     status: 2,
    //     comment: 'hhh',
    //   },
    // ]

    const getWorkerList = async () => {
      const res = await getRequest('/maintenance/getAllMaintenance', null);
      workerList.data = res.data.data;
      // console.log("修改后：", orderList)

    }

    getWorkerList();

    const getOrderList = async () => {
      const res = await getRequest('/order/getAllOrder', userInfo.userid);
      orderList.data = res.data.data;

      orderList.data.forEach(element => {
        if(element.status == 0) {
          element.maintenanceProgress = "待分配维修人员";
        }
        if(element.status == 1) {
          element.maintenanceProgress = "正在维修";
        }
        if(element.status == 2) {
          element.maintenanceProgress = "维修完成";
        }
        if(element.status == 2 && element.comment == null) {
          element.commentFlag = true;
        }
        if(element.comment != null) {
          element.commentFlag = false;
        }
        const worker = workerList.data.find((item) => item.phone == element.maintenance);
        if (worker != undefined) {
          element.workerName = worker.name;
        }
      })
      console.log("修改后：", orderList)

    }

    getOrderList();

    setInterval(getOrderList, 5000);



    setInterval(getWorkerList, 5000);

    const getBoardList = async () => {
      const res = await getRequest('/board/getAll', null);
      boardList.data = res.data.data;
      boardList.data.forEach(element => {
        // let date = element.time;
        let timeStamp = new Date(element.time).getTime()
        let date = new Date(timeStamp);
        let year = date.getFullYear()
        // 注意取得的月份为0-11，所以要加1
        let month = date.getMonth() + 1
        // 注意天的取得，是getDate()，而不是getDay()
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        // 格式拼接：yyyy-MM-dd HH:mm:ss
        element.time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        // element.time = timeDate.format("yyyy-MM-dd hh:mm:ss");
      })

    }

    getBoardList();

    setInterval(getBoardList, 5000);



    // const handleDeleteCoupon = (value) => {
    //   const index = couponList.data.findIndex(element => element.couponBatchID == value.couponBatchID)
    //   const isDelete = deleteCouponRequest()
    //   if(isDelete) {
    //     couponList.data.splice(index, 1)
    //   }
    // }

    return {
      orderForm,
      orderFormData,
      evaluateText,
      orderRules,
      dialogVisible,
      handleMaintenanceOrder,
      handleEvaluate,
      handleCancel,
      handleSubmit,
      orderList,
      workerList,
      boardList,
      Edit,
    };

  }
}
</script>
<style lang="scss">

.scroll {
  height: 550px;
  overflow: scroll;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.order-box-card {
  width: 480px;
  height: 500px;
}

.formStyle{
  position: absolute;
  width: 400px;
  margin-top: 100px;
  left: 50%;
  margin-left: -200px;
}

//.ml {
//  margin-left: 180px;
//}

.title {
  font-size: 50px;
}

//.infinite-list {
//  height: 300px;
//  padding: 0;
//  margin: 0;
//  list-style: none;
//}
.infinite-list-item-new {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

</style>
