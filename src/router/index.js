export const indexRouter=[
    {   
        name:"home",
        path:"/",
        component:()=>import("@/pages/home.vue"),
        children:[
            {   
                name:"index",
                path:"/",
                component:()=>import("@/pages/index/index.vue"),
                meta:{
                    keepalive:true,
                }
            },
            {   
                name:"student",
                path:"/student",
                component:()=>import("@/pages/index/student.vue"),
                meta:{
                    keepalive:false,
                }
            },
            {   
                name:"leave",
                path:"/leave",
                component:()=>import("@/pages/index/leave.vue"),
                meta:{
                    keepalive:false,

                }
            },
            {   
                name:"my",
                path:"/my",
                component:()=>import("@/pages/index/my.vue"),
                meta:{
                    keepalive:false,

                }
            },
        ],
        meta:{
            keep:true
        }
    },
    // {   
    //     name:"index",
    //     path:"/index",
    //     component:()=>import("@/pages/index/index"),
    //     meta:{
    //         teep:false
    //     }
    // }
]