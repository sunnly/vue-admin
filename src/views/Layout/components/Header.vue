<template>

    <div id="header-wrap">
        <div class="header-box">
            <div class="header-icon pull-left" @click="navMenuState">
                <svg-icon class-name="menu" icon-class="menu"></svg-icon>
            </div>

            <div class="header-icon pull-right" @click="logout">
                <svg-icon class-name="exit" icon-class="exit"></svg-icon>
            </div>
            <div class="header-content">
                <span class="header-manager"><img  src="@/assets/images/logo.png"></span>
                <span>管理员：Sunnly</span>
            </div>
        </div>
        <!--<div class="header-icon pull-left">

        </div>
        <div>&nbsp;</div>
        <div class="header-icon pull-right">
            <svg-icon class-name="exit" icon-class="exit"></svg-icon>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods:{
            navMenuState(){
                // this.$store.commit("changeCollapse")
                this.$store.dispatch("setMuneStatus")
            },
            logout(){
                this.$router.push({
                    name: "Login"
                })
            }
        },
        computed:{

        }
    }
</script>

<style scoped lang="scss">
    #header-wrap{
        position: fixed;
        top: 0;
        left: $navWidth;
        height: $headerHeight;
        width: calc(100% - #{$navWidth});
        background: white;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
        display: flex;
        justify-content: space-around;
        @include webkit(transition,all 0.3s ease 0s);

        .header-box{
            width: 100%;
            height: 100%;

            .pull-left{
                float: left;
                width: 25px;
                padding: 0 20px;
                height: 100%;
            }
            .pull-right{
                float: right;
                width: 70px;
                height: 100%;
                padding: 0 5px;
            }
            .header-content{
                float: right;
                text-align: right;
                line-height: $headerHeight;
                font-size: 14px;
                vertical-align: middle;

                .header-manager{
                    padding: 0 10px;

                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid #a1a1a1;
                        margin-bottom: -15px;
                    }
                }
            }
        }
        .header-icon{
            width: 100px;
            padding: 0 32px;
            line-height: $headerHeight;


            svg{
                font-size: 25px;
                margin-bottom: -8px;
                cursor: pointer;
            }
        }

    }
    .nav-open #header-wrap{
        left: $navWidth;
        width: calc(100% - #{$navWidth});
    }
    .nav-close #header-wrap{
        left: $navMinWidth;
        width: calc(100% - #{$navMinWidth});
    }
</style>