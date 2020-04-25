<template>
    <div id="nav-wrap">
        <div class="logo"><img src="@/assets/logo.png" /> </div>
        <!--                 @open="handleOpen"-->
        <!--                 @close="handleClose"-->
        <!--                 -->
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="transparent"
                 text-color="#ffffff"
                 :router="true"
        >
            <template v-for="(item,index) in routes" >
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <template slot="title">
                        <svg-icon :iconClass="item.icon" :className="item.icon"/>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <template v-for="(child,idx) in item.children">

                        <el-menu-item  v-if="!idx.hidden" :key="child.id" :index="child.path">
                            <svg-icon :iconClass="child.icon" :className="item.icon"/>
                            {{child.meta.name}}
                        </el-menu-item>

                    </template>

                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NavMenu",
        data(){
            return{
                routes:this.$router.options.routes
            }
        },
        created() {
            // console.log(this.$router.options.routes);
            // console.log(this.$store.state.isCollapse)
        },
        computed:{
            isCollapse(){
                return this.$store.state.app.isCollapse;
            }
        }
    }
</script>

<style scoped lang="scss">
#nav-wrap{
    position: fixed;
    width: $navWidth;
    left: 0;
    top: 0;
    height: 100%;
    background: #344a5f;
    text-align: left;
    @include webkit(transition,all 0.3s ease 0s);

    .logo{
        text-align: center;
        height: 69px;

        img{
            width: 45px;
            padding: 10px;
            @include webkit(transition,all 0.3s ease 0s);
        }
    }

    svg{
        font-size: 20px;
        margin-right: 10px;
        @include webkit(transition,all 0.3s ease 0s);
    }
}
.nav-open #nav-wrap{
    width: $navWidth;
}
.nav-close #nav-wrap{
    width: $navMinWidth;
    /*text-align: center;*/

    .logo{

        img{
            margin-top: 10px;
            width: 35px;
        }
    }

    svg{
        margin-right: 0px;
    }
}
</style>