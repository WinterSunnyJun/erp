<template>
    <div id="account" >   
        <div class="search-wrap">
            <div class="new-task" @click="addAccount">
                <div class="task-icon"></div>
                <span>添加员工</span>
            </div>
            <div class="p-search">
                <div class="search-input">
                    <input type="text" placeholder="请输入查询内容...">
                </div>
                <div class="search-btn">
                    <button>查询</button>
                </div>
            </div>
        </div>
        <div class="account-table" v-loading="loading">
        
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>账号管理</span>
            </div>
            <table class="p-table" width="1428"   cellspacing="0" align="center">
                <thead>
                    <th>姓名</th>
                    <th>账号</th>
                    <th>部门</th>
                    <th>联系方式</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="(ele,index) in staffInfo">
                        <td width="499">{{ele.nickname}}</td>
                        <td width="220">{{ele.username}}</td>
                        <td width="242">{{ele.department_id}}</td>
                        <td width="174">{{ele.mobile}}</td>
                        <td width="289">
                            <span @click="toRedactAccount(ele.id)">编辑</span>
                            <i> /</i>
                            <span @click="deleteAccount(index,ele.id)">删除</span>    
                        </td>
                    </tr>
                </tbody> 
            </table>
            <div class="page-break">
                <div class="page-content">
                    <div class="page-btn btn-prev" v-show="current != 1" @click="current-- && goto(current--)" ></div>
                    <div class="page">
                        <span class="page-item"  v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">{{index}}</span>
                        
                    </div>
                    <div class="page-btn btn-next" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var qs = require('qs')
export default {
  data () {
    return {
        staffInfo:[],
        current:1,
        showItem:5,
        allpage:'',
        loading:false
    }
  },
  computed:{
    pages(){
        var pag = [];
        if( this.current < this.showItem ){ 
            var i = Math.min(this.showItem,this.allpage);
            while(i){
                pag.unshift(i--);
            }
        }else{ 
            var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                i = this.showItem;
            if( middle >  (this.allpage - this.showItem)  ){
                middle = (this.allpage - this.showItem) + 1
            }
            while(i--){
                pag.push( middle++ );
            }
        }
        return pag
    },
  },
  methods:{
    goto(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
            this.getAccountLists()
    },
    addAccount(){
        this.$router.push({path:'/addaccount'})
    },
    toRedactAccount(id){
        this.$router.push({path:'/accountRedact',query:{'id':id}})
    },
    deleteAccount(index,id){
        var params = qs.stringify({
            'user_id':id,
        })
         this.$confirm('确定删除该账号么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.get('api/user/staff/delete',{params:{
                'user_id':id,
            }},{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
            })
                .then(res=>{
                    if(res.data.response_data){
                        this.staffInfo.splice(index,1);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败！'
                        });
                    }
                })
        })  
    },
    getAccountLists(){
        this.loading=true;
        this.$axios.get('api/user/staff/lists',{params:{
            'page':this.current,
            'num':8
        }})
        .then(res=>{
            if(res.data.response_data){
                console.log(res.data.response_data.lists)
                var pages = res.data.response_data.count;
                this.allpage = Math.ceil(pages/8)
                var account = res.data.response_data.lists;
                account.forEach((ele,index)=>{
                    if(ele.department_id == 1){
                        ele.department_id = "设计部"
                    }else if(ele.department_id == 2){
                        ele.department_id = "数据分析部"
                    }else if(ele.department_id == 3){
                        ele.department_id = "质检部"
                    }else if(ele.department_id == 4){
                        ele.department_id = "产品部"
                    }else if(ele.department_id == 5){
                        ele.department_id = "材料供应商"
                    }else if(ele.department_id == 6){
                        ele.department_id = "OEM代加工"
                    }else if(ele.department_id == 7){
                        ele.department_id = "客户"
                    }else if(ele.department_id == 8){
                        ele.department_id = "超级管理员"
                    }
                })
                this.staffInfo = account;
                this.loading=false;
            }
        })
    }
  },
  mounted(){
      this.getAccountLists();
  }
}
</script>
<style scoped>
#account{
    width:100%;
    height:100%;
}
.search-wrap {
    position:absolute;
    left:1062px;
    top:40px;
    width:475px;
}
.new-task{
    float:left;
    width:146px;
    height:63px;
    background:rgba(0,0,0,0.3);
    cursor:pointer;
}
.task-icon{
    float:left;
    width:18px;
    height:18px;
    background:url(../../../../../static/images/m-write.png);
    margin:24px 18px 0 20px;
}
.new-task span{
    line-height:63px;
    font-size:16px;
}
.p-search {
    float:left;
    margin-left:15px;
}
.search-input {
    float:left;
    width:249px;
    height:63px;
    background:rgba(0,0,0,0.3);
    border-right:1px solid #686572;
}
.search-input input {
    height:100%;
    padding-left:22px;
    border:0;
    background:none;
    color:#fff;
    font-size:16px;
    outline:0;
}
.search-btn{
    float:left;
    width:63px;
    height:63px;
    background:rgba(0,0,0,0.3);
}
.search-btn button {
    width:100%;
    height:100%;
    border:0;
    background:none;
    color:#fff;
    font-size:16px;
    cursor:pointer;
    outline:0;
}
.account-table {
    width:1428px;
    position:absolute;
    left:108px;
    top:144px;
    font-size:20px;
    background:rgba(0,0,0,0.4)
}
.f-tit{
    overflow:hidden;
    height:63px;
    border-bottom:1px solid #686572;
}
.tit-icon{
    float:left; 
    width:25px;
    height:25px;
    margin-top:21px;
    margin-left:26px;
    background:url(../../../../../static/images/task01.png);
}
.f-tit span {
    line-height:63px;
    margin-left:19px;
    font-size:24px;
}
.p-table thead th{
    line-height:63px;
    text-align:center;
    border-right:1px solid #686572;
}
.p-table thead th:last-child{
    border-right:0;
}
.p-table tbody tr td{
    line-height:63px;
    text-align:center;
    border-top:1px solid #686572;
    border-right:1px solid #686572;
}
.p-table tbody tr td:first-child{
    text-align:left;
    padding-left:30px;
}
.p-table tbody tr td:last-child{
    border-right:none;
}
.p-table tbody tr td i{
    padding:0 10px;
}
.p-table tbody tr td span{
    cursor:pointer;
}
.page-break {
    width:100%;
    height:63px;
    border-top:1px solid #686572;
}
.page-content{
    overflow:hidden;
    margin:0 auto;
    display:flex;
    justify-content:center;
}
.page {
    float:left;
	margin:16px  20px 0;
	text-align: center;
}
.page span {
	font-size: 20px;
	color:#fff;
	padding: 0 21px;
	cursor: pointer;
}
.page .active {
	color:red;
	font-weight: 900;
}
.page-btn {
    float:left;
    width:13px;
    height:22px;
    margin-top:18px;
    cursor: pointer;
}
.btn-prev{
    background:url(../../../../../static/images/p-prev.png);
}
.btn-next{
    background:url(../../../../../static/images/p-next.png);
}

</style>