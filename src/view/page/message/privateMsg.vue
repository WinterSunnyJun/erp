<template>
    <div id="privateMsg">   
        <div class="project-table">
            <div class="f-tit">
                <div class="tit-icon"></div>
                <span>站内信</span>
            </div>
            <table class="p-table" width="1393"  cellspacing="0" v-if="privateMsgLists.length">
                <thead>
                    <th>内容</th>
                    <th>阅读时间</th>
                    <th>发信时间</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="(ele,index) in privateMsgLists">
                        <td width="615">{{ele.content}}</td>
                        <td width="274">{{ele.mtime | time}}</td>
                        <td width="274">{{ele.ctime | time}}</td>
                        <td width="97">
                            <span @click="deleteMsg(index,ele.id)">删除</span>
                        </td>
                    </tr>
                </tbody> 
            </table>
            <div class="page-break" v-if="privateMsgLists.length">
                <div class="page-content">
                    <div class="page-btn btn-prev" v-show="current != 1" @click="current-- && goto(current--)" ></div>
                    <div class="page">
                        <span class="page-item"  v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">{{index}}</span>
                        
                    </div>
                    <div class="page-btn btn-next" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"></div>
                </div>
            </div>
            <div class="no-content" v-if="privateMsgLists.length == 0">
                还没有内容
             </div>
        </div>
        
    </div>
</template>

<script>
export default {
  data () {
    return {
      privateMsgLists:[],
      current:1,
      showItem:5,
      allpage:4,
    }
  },
  filters: {
    time: function (value) {
      if(!value) return
      let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  },
  computed:{
    pages(){
        var pag = [];
        if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
            //总页数和要显示的条数那个大就显示多少条
            var i = Math.min(this.showItem,this.allpage);
            while(i){
                pag.unshift(i--);
            }
        }else{ //当前页数大于显示页数了
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
    deleteMsg(index,id){
         
        this.$confirm('确定删除该项目么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.get('api/index/index/delete_mall',{params:{
            'id':id
        }}).then(res=>{
            if(res.data.response_data){
                 this.privateMsgLists.splice(index,1);  
                    this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            }else{
                  this.$message({
                    type: 'error',
                    message: '删除失败！'
                })
            }
             
         })
        })  
    },
    goto(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
            this.getMessageLists()
    },
    getMessageLists(){
        this.$axios.get('api/index/index/mall_lists',{params:{
            'page':this.current,
            'num':8
        }})
        .then(res=>{
            if(res.data.response_data){
                var pages = res.data.response_data.count;
                this.allpage = Math.ceil(pages/8);
                this.privateMsgLists=res.data.response_data.lists;

            }
    })    
    }
  },
  
  mounted(){
    this.getMessageLists()
  }

}
</script>
<style scoped>
.search-wrap {
    position:absolute;
    left:1053px;
    top:80px;
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
    background:url(../../../../static/images/m-write.png);
    margin:24px 28px 0 20px;
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
.project-table {
    width:1393px;
    position:absolute;
    left:135px;
    top:141px;
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
    width:28px;
    height:20px;
    margin-top:21px;
    margin-left:26px;
    background:url(../../../../static/images/msg.png);
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
.p-table tbody tr td:last-child{
    border-right:none;
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
    background:url(../../../../static/images/p-prev.png);
}
.btn-next{
    background:url(../../../../static/images/p-next.png);
}
.no-content{
    width:100%;
    height:500px;
    color:#fff;
    line-height:500px;
    text-align:center;
    font-size:22px;
}

</style>