<template>
  <el-row :gutter="20">
    <el-col :span="20" style="margin-top: 30px">
      <el-text style="font-size: 50px; " size="large">汽车维修预约网站（管理员）</el-text>
    </el-col>
  </el-row>

  <el-tabs type="border-card" class="scroll">
    <el-tab-pane label="首页">
      <el-container>
        <el-header></el-header>
        <el-main>
          <!--      第一行-->
          <el-row :gutter="20">
            <!--        第一列-->
            <el-col :span="12" class="x-center">
              <el-text class="mx-1" size="large" type="primary" tag="b">添加师傅功能</el-text>
              <el-table :data="workerList.data" style="width: 70%" class="ml">
                <el-table-column prop="name" label="名字" />
                <el-table-column prop="phone" label="电话"  />
                <el-table-column prop="age" width="130" label="年龄" />
                <el-table-column prop="major" width="130" label="主修项目" />
                <el-table-column prop="seniority" width="130" label="工龄" />
                <el-table-column  label="编辑">
                  <template #default="scope">
                    <el-button link type="primary" @click="handleChangeInfo(scope.row)" size="small">修改</el-button>
                  </template>
                </el-table-column>
                <el-table-column  label="删除">
                  <template #default="scope">
                    <el-button link type="primary" @click="handleDeleteInfo(scope.row)" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                  type="primary"
                  style="width: 46%; margin-left: 8%"
                  @click="handleAddWorker"
              >添 加</el-button>
            </el-col>
            <!--          第二列-->
            <el-col :span="12" class="x-center">
              <el-text class="mx-1" size="large" type="primary" tag="b">待分配订单列表</el-text>
              <el-table :data="noAssignOrderList.data" style="width: 70%" class="ml">
                <el-table-column prop="orderDate" label="预约时间" />
                <el-table-column prop="maintenanceProject" label="维修项目"  />
                <el-table-column prop="problem" label="故障描述"  />
                <el-table-column prop="plateNumber" label="车牌"  />
                <el-table-column prop="model" label="车型号"  />
                <el-table-column  label="分配师傅" width="180">
                  <template #default="scope">
                    <el-button  link type="primary" @click="handleAssignWorker(scope.row)" size="small">分配</el-button>
                  </template>
                  <!--              <template #default="scope">-->
                  <!--                <el-select-->
                  <!--                    v-model="orderForm.phone"-->
                  <!--                    class=""-->
                  <!--                    placeholder="请选择"-->
                  <!--                    size="small"-->
                  <!--                    style="width: 100px"-->
                  <!--                >-->
                  <!--                  <el-option-->
                  <!--                      v-for="item in workerList.data"-->
                  <!--                      :key="item.id"-->
                  <!--                      :label="item.name"-->
                  <!--                      :value="item.phone"-->
                  <!--                  />-->
                  <!--                </el-select>-->
                  <!--              </template>-->
                </el-table-column>
              </el-table>
            </el-col>

          </el-row>
          <!--      第二行-->
          <el-row :gutter="20" class="mt">
            <!--        第一列-->
            <el-col :span="12" class="x-center">
              <el-text class="mx-1" size="large" type="primary" tag="b">正在维修订单列表</el-text>
              <el-table :data="noFinishOrderList.data" style="width: 70%" class="ml">
                <el-table-column prop="orderDate" label="预约时间" />
                <el-table-column prop="maintenanceProject" label="维修项目"  />
                <el-table-column prop="plateNumber" label="车牌"  />
                <el-table-column prop="model" label="车型号"  />
                <el-table-column prop="workerName" label="维修师傅"  />
                <el-table-column prop="maintenance" label="师傅电话"  />
                <el-table-column  label="修改进度">
                  <template #default="scope">
                    <el-button link type="primary" @click="handleStatusChange(scope.row)" size="small">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <!--        第二列-->
            <el-col :span="12" class="x-center">
              <el-text class="mx-1" size="large" type="primary" tag="b">维修完成订单列表</el-text>
              <el-table :data="finishOrderList.data" style="width: 70%" class="ml">
                <el-table-column prop="orderDate" label="预约时间" />
                <el-table-column prop="maintenanceProject" label="维修项目"  />
                <el-table-column prop="plateNumber" label="车牌"  />
                <el-table-column prop="model" label="车型号"  />
                <el-table-column prop="workerName" label="维修师傅"  />
                <el-table-column prop="workerPhone" label="师傅电话"  />
                <el-table-column prop="comment" label="用户评价"  />
              </el-table>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <!--      <el-row>-->
          <!--        <el-button type="primary" :icon="Edit" @click="handleEvaluate" size="small"/>-->
          <!--      </el-row>-->
        </el-footer>
        <!--    添加维修师傅 dialog-->
        <el-dialog v-model="dialogWorkerFormVisible" title="信息修改">
          <el-form ref="workerChangeForm"  :model="workerForm" :rules="workerRules" >
            <el-form-item label="姓名" prop="name" class="workerFormWidthStyle">
              <el-input size="default" v-model="workerForm.name" />
            </el-form-item>
            <el-form-item label="电话" prop="phone" class="workerFormWidthStyle">
              <el-input :disabled="phoneDisable" size="default" v-model="workerForm.phone" />
            </el-form-item>
            <el-form-item label="年龄" prop="age" class="workerFormWidthStyle">
              <el-input size="small" v-model="workerForm.age" />
            </el-form-item>
            <el-form-item label="主修项目" prop="major" class="workerFormWidthStyle">
              <el-input size="small" v-model="workerForm.major" />
            </el-form-item>
            <el-form-item label="工龄" prop="seniority" class="workerFormWidthStyle">
              <el-input size="small" v-model="workerForm.seniority" />
            </el-form-item>
          </el-form>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleWorkerCancel">取消</el-button>
        <el-button type="primary" @click="handleWorkerSubmit">
          提交
        </el-button>
      </span>
          </template>
        </el-dialog>
        <!--    修改维修进度订单 dialog-->
        <el-dialog v-model="dialogStatusVisible" title="改变维修进度">
          <el-select
              v-model="orderForm.status"
              class=""
              placeholder="请选择"
              size="small"
              style="width: 200px"
          >
            <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleStatusCancel">取消</el-button>
        <el-button type="primary" @click="handleStatusSubmit">
          提交
        </el-button>
      </span>
          </template>
        </el-dialog>

        <!--    分配维修师傅 dialog-->
        <el-dialog v-model="dialogAssignWorkerVisible" title="分配维修师傅">
          <el-select
              v-model="orderForm.phone"
              class=""
              placeholder="请选择"
              size="small"
              style="width: 200px"
          >
            <el-option
                v-for="item in workerList.data"
                :key="item.id"
                :label="item.name"
                :value="item.phone"
            />
          </el-select>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAssignWorkerCancel">取消</el-button>
        <el-button type="primary" @click="handleAssignWorkerSubmit">
          提交
        </el-button>
      </span>
          </template>
        </el-dialog>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="公告管理">
      <el-button
          type="primary"
          style="width: 20%; margin-left: 41%"
          @click="handleAddBoard"
      >添 加</el-button>
      <el-dialog v-model="dialogBoardVisible" title="公告" destroy-on-close center>
        <el-form ref="boardForm" :model="boardFormData" :rules="boardRules" class="">
          <el-form-item label="发布时间" prop="time">
            <el-date-picker
                v-model="boardFormData.time"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="发布时间"
            />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input type="text" size="default" v-model="boardFormData.title" />
          </el-form-item>

          <el-form-item label="公告内容" prop="context">
            <el-input type="textarea" size="default" v-model="boardFormData.context" />
          </el-form-item>
        </el-form>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleBoardCancel">取消</el-button>
        <el-button type="primary" @click="handleBoardSubmit">
          提交
        </el-button>
      </span>
        </template>
      </el-dialog>
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="board in boardList.data" :key="board" class="infinite-list-item-new">
          <el-row>
            <el-text >公告标题：{{board.title}}</el-text>  <el-text style="margin-left: 20px">发布时间：{{board.time}}</el-text>
            <el-button type="danger" style="margin-left: 50px" @click="handleDeleteBoard(board)"> 删除 </el-button>
          </el-row>
          <el-row>
            <el-text style="margin-left: -200px">{{board.context}}</el-text>
          </el-row>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="添加管理员">

      <el-container>
        <el-header></el-header>
        <el-main>
          <el-form ref="adminForm"  :model="adminFormData" :rules="adminRules"  >
            <el-form-item label="用户名" prop="managerId" style="width: 300px">
              <el-input size="small" v-model="adminFormData.managerId" />
            </el-form-item>
            <el-form-item label="密码" prop="password" style="width: 300px">
              <el-input size="default" type="password" show-password v-model="adminFormData.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="buttonStyle" @click="handleAddAdmin">添加</el-button>
            </el-form-item>
          </el-form>
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
    const workerList = reactive({
      data: [
      ]
    })

    const workerChangeForm = ref(null)

    const workerForm = reactive({
      name: '',
      phone: '',
      age: '',
      major: '',
      seniority: '',
    })

    const noAssignOrderList = reactive({
      data: []
    })

    const noFinishOrderList = reactive({
      data: []
    })

    const finishOrderList = reactive({
      data: []
    })

    const boardList = reactive({
      data: [
      ]
    })


    const orderForm = reactive({
      orderId: '',
      phone: '',
      status: '',
    })

    const adminForm = ref(null)
    const adminFormData = reactive({
      managerId: '',
      password: '',
    })

    const boardForm = ref(null);
    const boardFormData = reactive({
      context: '',
      title: '',
      time: '',
    })



    const statusOptions = [
      {
        value: 1,
        label: '正在维修',
      },
      {
        value: 2,
        label: '维修完成',
      },
    ]


    const dialogStatusVisible = ref(false);
    const dialogAssignWorkerVisible = ref(false);
    const phoneDisable = ref(false);
    const dialogWorkerFormVisible = ref(false);
    const dialogBoardVisible = ref(false);


    const handleChangeInfo = (val) => {
      // console.log(val)
      workerForm.id = val.id;
      workerForm.phone = val.phone;
      phoneDisable.value = true;
      dialogWorkerFormVisible.value = true;
    }

    const handleDeleteInfo = async (val) => {

      console.log("删除 ", val);
      //用电话号码删除
      const res = await phoneParamsRequest('/maintenance/delete', val.phone)
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
          showClose: true,
        })
        // const index = workerList.data.findIndex(val => val.userid == id);
        // workerList.data.splice(index, 1)
        await getWorkerList();
      }else {
        ElMessage({
          type: 'error',
          message: '删除失败',
          showClose: true,
        })
      }
    }


    const handleWorkerCancel = () => {
      dialogWorkerFormVisible.value = false;
      workerForm.name = '';
      workerForm.phone = '';
      workerForm.age = '';
    }

    const handleWorkerSubmit = async () => {
      dialogWorkerFormVisible.value = false;
      if(workerForm.id == null) {
        //新增

        const res = await request('/maintenance/add', workerForm)
        if (res.data.status == 200) {
          ElMessage({
            type: 'success',
            message: '新增成功',
            showClose: true,
          })
        }else {
          ElMessage({
            type: 'error',
            message: '新增失败',
            showClose: true,
          })
        }
      }else {
        //修改
        // 电话不可以修改
        const res = await request('/maintenance/update', workerForm)
        if (res.data.status == 200) {
          ElMessage({
            type: 'success',
            message: '修改成功',
            showClose: true,
          })
        }else {
          ElMessage({
            type: 'error',
            message: '修改失败',
            showClose: true,
          })
        }
      }
      await getWorkerList();
    }

    const handleAddWorker = () => {
      dialogWorkerFormVisible.value = true;
      phoneDisable.value = false;
    }

    const handleAddBoard = () => {
      dialogBoardVisible.value = true;
    }

    const handleDeleteBoard = async (val) => {

      console.log("删除 ", val);

      const res = await boardParamsRequest('/board/delete', val.id)
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
          showClose: true,
        })
        // const index = workerList.data.findIndex(val => val.userid == id);
        // workerList.data.splice(index, 1)
        await getBoardList();
      }else {
        ElMessage({
          type: 'error',
          message: '删除失败',
          showClose: true,
        })
      }
    }


    const checkPhone = (rule, value, callback) => {
      //电话正则
      const phoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      if (!phoneRegexr.test(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }


    const workerRules = reactive({
      phone: [{ validator: checkPhone, trigger: 'blur' }],
    })

    const checkPassword = (rule, value, callback) => {
      //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      const passwordRegexr = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if (!passwordRegexr.test(value)) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }

    const adminRules = reactive({
      managerId: [{ required: true, trigger: 'blur' }],
      password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
    })

    const boardRules = reactive({
      title: [{ required: true, trigger: 'blur' }],
      time: [{ required: true, trigger: 'blur' }],
      context: [{ required: true, trigger: 'blur' }],
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

    const phoneParamsRequest = (url, val) => {
      return service({
        url: url,
        method: 'post',
        params:{
          phone: val,
        },
      })
    }

    const boardParamsRequest = (url, val) => {
      return service({
        url: url,
        method: 'post',
        params:{
          id: val,
        },
      })
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

    const getWorkerList = async () => {
      const res = await getRequest('/maintenance/getAllMaintenance', null);
      workerList.data = res.data.data;
    }

    getWorkerList();

    const getNoAssignOrderList = async () => {
      const res = await getRequest('/order/getNoAssign', null);
      noAssignOrderList.data = res.data.data;
      noAssignOrderList.data.forEach(element => {
        element.maintenanceProgress = "待分配维修人员";
      })
    }

    getNoAssignOrderList();

    setInterval(getNoAssignOrderList, 5000);

    const getNoFinishOrderList = async () => {
      const res = await getRequest('/order/getAllNoFinish', null);
      noFinishOrderList.data = res.data.data;
      noFinishOrderList.data.forEach(element => {
        element.maintenanceProgress = "正在维修";
        const worker = workerList.data.find((item) => item.phone == element.maintenance);
        element.workerName = worker.name;
      })
      // console.log("未完成订单", noFinishOrderList);
    }

    getNoFinishOrderList();
    setInterval(getNoFinishOrderList, 5000);

    const getFinishOrderList = async () => {
      const res = await getRequest('/order/getAllFinish', null);
      finishOrderList.data = res.data.data;
      finishOrderList.data.forEach(element => {
        element.maintenanceProgress = "维修完成";
        element.workerName = element.maintenance.name;
        element.workerPhone = element.maintenance.phone;
        // const worker = workerList.data.find((item) => item.phone == element.maintenance);
        // element.workerName = worker.name;
      })
    }

    getFinishOrderList();
    setInterval(getFinishOrderList, 5000);

    const handleStatusChange = (val) => {
      orderForm.orderId = val.id;
      dialogStatusVisible.value = true;
      // console.log('状态改变', val)
    }

    const handleAssignWorker = (val) => {
      orderForm.orderId = val.id;
      dialogAssignWorkerVisible.value = true;
      // console.log('状态改变', val)
    }



    const handleStatusCancel = () => {
      orderForm.status = '';
      dialogStatusVisible.value = false;
      console.log('quxiao')
    }



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

    const handleBoardCancel = () => {
      boardFormData.context = '';
      boardFormData.time = '';
      boardFormData.title = '';
      dialogBoardVisible.value = false;
    }

    const handleBoardSubmit = async () => {
      // console.log(orderForm)
      const res = await request('/board/add', boardFormData);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '添加公告成功',
          showClose: true,
        })
      }else {
        ElMessage({
          type: 'error',
          message: '添加公告失败',
          showClose: true,
        })
      }
      dialogBoardVisible.value = false;
      await getBoardList();
    }

    const handleAssignWorkerCancel = () => {
      orderForm.phone = '';
      dialogAssignWorkerVisible.value = false;
      // console.log('quxiao')
    }

    const handleAssignWorkerSubmit = async () => {
      // console.log(orderForm)
      const res = await request('/manager/assignOrder', orderForm);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '分配师傅成功',
          showClose: true,
        })
      }else {
        ElMessage({
          type: 'error',
          message: '分配师傅失败',
          showClose: true,
        })
      }
      dialogAssignWorkerVisible.value = false;
      await getNoAssignOrderList();
      await getNoFinishOrderList();
    }

    const handleStatusSubmit = async () => {
      // console.log(orderForm)
      const res = await request('/manager/assignStatus', orderForm);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '修改状态成功',
          showClose: true,
        })
      }else {
        ElMessage({
          type: 'error',
          message: '修改状态失败',
          showClose: true,
        })
      }
      dialogStatusVisible.value = false;
      await getNoFinishOrderList();
      await getFinishOrderList();
    }

    const handleAddAdmin = async () => {
      // console.log(orderForm)
      const res = await request('/manager/register', adminFormData);
      if (res.data.status == 200) {
        ElMessage({
          type: 'success',
          message: '注册成功',
          showClose: true,
        })
      }else {
        ElMessage({
          type: 'error',
          message: '注册失败',
          showClose: true,
        })
      }
    }

    // const handleDeleteCoupon = (value) => {
    //   const index = couponList.data.findIndex(element => element.couponBatchID == value.couponBatchID)
    //   const isDelete = deleteCouponRequest()
    //   if(isDelete) {
    //     couponList.data.splice(index, 1)
    //   }
    // }

    return {
      workerChangeForm,
      workerForm,
      workerRules,
      dialogWorkerFormVisible,
      dialogStatusVisible,
      dialogAssignWorkerVisible,
      dialogBoardVisible,
      handleChangeInfo,
      handleDeleteInfo,
      handleAddWorker,
      handleAddBoard,
      handleWorkerCancel,
      handleWorkerSubmit,
      handleStatusChange,
      handleAssignWorker,
      handleStatusCancel,
      handleStatusSubmit,
      handleAssignWorkerCancel,
      handleAssignWorkerSubmit,
      handleBoardCancel,
      handleBoardSubmit,
      handleDeleteBoard,
      workerList,
      noAssignOrderList,
      noFinishOrderList,
      finishOrderList,
      phoneDisable,
      statusOptions,
      boardList,
      orderForm,
      adminForm,
      adminFormData,
      boardForm,
      boardFormData,
      boardRules,
      adminRules,
      handleAddAdmin,
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

.box-card {
  width: 480px;
  height: 800px;
}

.formStyle {
  width: 400px;
  height: 800px;
}

.workerFormWidthStyle {
  margin-left: 100px;
  width: 300px;
}
.x-center {
  text-align: center;
}
.y-center {
  height: 200px;
  line-height: 200px;
}
.ml {
  margin-left: 180px;
}
.mt {
  margin-top: 50px;
}

.formStyle{
  position: absolute;
  width: 400px;
  margin-top: 100px;
  left: 50%;
  margin-left: -200px;
}

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
