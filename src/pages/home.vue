<template>
    <div>
        <!-- 动态缓存 -->
        <keep-alive >
            <router-view v-if="$route.meta.keepalive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>
        <Tabs @tabs="tabs" :index="index"></Tabs>
    </div>
</template>
<script>
import Tabs from "@/components/tabs/tabs.vue"
export default {
    name:"home",
    data(){
        return{
            list:[
                {
                    name:"/"
                },
                {
                    name:"/student"
                },
                {
                    name:"/leave"
                },
                {
                    name:"/my"
                }
            ],
            index:0
        }
    },
    methods:{
        //tabs组件
        tabs(e){
            let {index}=e;
            if(index===this.index) return;
            this.index=index;
            this.$router.push(this.list[index].name);
        },
        //默认home第几个
        initEvent(){
            this.$router.push(this.list[this.index].name);
        }
    },
    created(){
        // this.initEvent();
    },
    mounted(){
         
    },
    components:{
        Tabs
    }
}
</script>