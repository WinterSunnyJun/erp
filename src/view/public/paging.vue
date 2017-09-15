<template>
    <div class="page-break">
        <div class="page-content">
            <div class="page-btn btn-prev" v-show="current != 1" @click="current-- && goto(current)" ></div>
            <div class="page">
                <span class="page-item"  v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">{{index}}</span>
                
            </div>
            <div class="page-btn btn-next" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current)"></div>
        </div>
    </div>
</template>
<script>
//v-if="userInfo.type == 1"
export default {
    data(){
        return{
            current:1,
            showItem:5,
        }
    },
    porops:{
        'allpage':Number
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
        goto(index){
            if(index == this.current) return;
            this.current = index;
            this.$emit('togo',index);
        },
    }
}
</script>
<style scoped>
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
    background:url(../../../static/images/p-prev.png);
}
.btn-next{
    background:url(../../../static/images/p-next.png);
}
</style>