<template>

    <div class="content">
        <div class="bg-box">
            <div v-for="(item,idx) in bgs" :class="'bg bg'+idx" ></div>
        </div>
        <div class="content-box">
            <div class="box-center">
                <div class="left">
                    <div class="font-box">
                        <div class="font-context">{{bg.text1}}</div>
                        <div class="font-context">{{bg.text2}}</div>
                        <div class="font-min">{{bg.text3}}</div>
                    </div>
                    <div class="font-background"></div>
                </div>
                <div class="right">
                    <div class="login" v-show="type=='login'">
                        <div class="logo">
                            <img src="../assets/images/logo.png">
                        </div>
                        <div class="register-txt">没有账户？
                            <span class="register-btn" @click="type = 'register'">注册</span>
                        </div>
                        <div class="login-form">
                            <el-form ref="login" :model="login">
                                <el-form-item>
                                    <el-input class="input" prefix-icon="el-icon-user" placeholder="用户名/邮箱/手机号" v-model="login.username"></el-input>
                                </el-form-item>
                                <el-form-item>
                                <el-input class="input" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="login.password" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="login-btn" type="primary" @click="toLogin" >登录</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="forgot" @click="type='forgot'">忘记密码？</div>
                    </div>
                    <div class="register" v-show="type=='register' || type=='forgot'">
                        <div class="label">{{type=='register'? '用户注册': '找回密码'}}</div>
                        <div class="register-form">
                            <el-form ref="register" :rules="registerRules" :model="register">
                                <el-form-item prop="username">
                                    <el-input class="input" prefix-icon="el-icon-user" placeholder="用户名/邮箱/手机号" v-model="register.username"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input class="input" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="register.password" show-password></el-input>
                                </el-form-item>
                                <el-form-item prop="repassword">
                                    <el-input class="input" prefix-icon="el-icon-lock" placeholder="确认密码" v-model="register.repassword" show-password></el-input>
                                </el-form-item>
                                <el-form-item prop="validate">
                                    <el-row>
                                        <el-col align="right" :span="13">
                                            <el-input class="validate-box" prefix-icon="el-icon-chat-dot-square" placeholder="验证码" v-model="register.validate"></el-input>
                                        </el-col>
                                        <el-col :span="9">
                                            <el-button class="validate-btn" type="primary">发送验证码</el-button>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item>
                                    <el-alert class="errmsg"
                                            :title="register.errmsg"
                                            type="error"
                                            :closable="false"
                                            show-icon>
                                    </el-alert>
                                </el-form-item>
                                <el-form-item class="register-btn-box">
                                    <el-button class="register-btn" type="primary" @click="toRegister" >{{type=='register'? '注册': '确定'}}</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="login-link">
                                <span>已有账号，去</span><span class="go" @click="type = 'login'">登录</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">Sunnly出品 CopyRight@Sunnly 2020</div>
    </div>
</template>

<script>
    import {Login} from "../api/login";
console.log(process.env.VUE_APP_ABC);
    export default {
        name: "Login",
        data(){
            return {
                type: 'login',
                bg: {
                    index: 0,
                    text1: '今天 你会去改变',
                    text2: '什么呢？',
                    text3: '开始你的创作之旅'
                },
                bgs: [
                    {
                        text1: '今天 你会去改变',
                        text2: '什么呢？',
                        text3: '开始你的创作之旅'
                    },{
                        text1: '人生 每一个清晨',
                        text2: '都该努力',
                        text3: '看见初升的太阳'
                    },{
                        clazz: 3,
                        text1: '人生有 三五知己',
                        text2: '足矣',
                        text3: '真诚才能永相守，珍惜才配长拥有。'
                    },{
                        text1: '青春一经“典当”',
                        text2: '永不再赎',
                        text3: '不要等到自己年老的时候，才会明白时间是多么的可贵。'
                    }
                ],
                login:{
                    username: 'sunnly',
                    password: 'sunnly'
                },

                register:{
                    username: '',
                    password: '',
                    repassword: '',
                    validate: '',
                    errmsg: '两次输入密码不一致'
                },
                registerRules:{
                   /* repassword: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]*/
                }
            }
        },
        mounted(){
            setInterval(this.setBackground,4000);
        },
        methods:{
            setBackground(){
                let cindex = ++this.bg.index;
                if (cindex >= this.bgs.length){
                    cindex = 0;
                }
                this.bg = this.bgs[cindex];
                this.bg.index = cindex;
            },
            forgotPwd(){
                //忘记密码
            },
            toLogin(){
                // Login();
                this.$router.push({
                    name: 'Index',
                    params: {username: this.login.username}
                });

                // alert("login");
            },
            toRegister(){
                this.$refs.register.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/animation";
    .bg-box{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
    }
    .bg{
        z-index: 1;
        width: 100%;
        height: 100%;
        background: no-repeat 50% 50%;
        background-size: cover;

        animation-duration: 16s;
        opacity: 1;
        transform: scale(1.2);
        position: absolute;
        -webkit-animation-name: kenburns;
        animation-name: kenburns;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-duration: 16s;
        -webkit-transform: scale(1.2);
    }

    .bg0{
        background: url("../assets/images/bg4.jpg") no-repeat center top;
        -webkit-animation: kenburns-1 16s infinite;
        animation: kenburns-1 16s infinite;
        z-index: 3;
    }
    .bg1{
        background: url("../assets/images/bg1.jpg") no-repeat center top;
        -webkit-animation: kenburns-2 16s infinite;
        animation: kenburns-2 16s infinite;
        z-index: 2;
    }
    .bg2{
        background: url("../assets/images/bg2.jpg") no-repeat center top;
        -webkit-animation: kenburns-3 16s infinite;
        animation: kenburns-3 16s infinite;
        z-index: 1;
    }
    .bg3{
        background: url("../assets/images/bg3.jpg") no-repeat center top;
        -webkit-animation: kenburns-4 16s infinite;
        animation: kenburns-4 16s infinite;
        z-index: 0;
    }

    .content{
        width: 100%;
        height: 100%;
        .content-box{
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            .box-center{
                z-index: 3;
                width: 750px;
                height: 500px;
                display: flex;
                justify-content: right;
                border-radius: 25px;
                -webkit-border-radius: 25px;

                .left{
                    width: 460px;
                    height: 100%;
                    position: static;

                    .font-background{
                        position: absolute;
                        width: 460px;
                        height: 500px;
                        filter: blur(1px);
                        background-color: rgba(255,255,255,.5);

                    }
                    .font-box{
                        position: absolute;
                        z-index: 999;
                        padding: 28px 38px;
                        color: #347bcc;

                        .font-context{
                            font-size: 38px;
                            font-weight: bold;
                            letter-spacing: 4px;
                            text-align: left;
                        }

                        .font-min{
                            font-size: 14px;
                            font-weight: bold;
                            margin-top: 5px;
                            text-align: left;
                        }
                    }
                }
                .right{
                    /*background: white;*/
                    background: $color;
                    width: 300px;
                    height: 100%;

                    .login{
                        position: relative;
                        text-align: center;
                        .logo{
                            img{
                                margin-top: 60px;
                                width: 75px;
                                height: 75px;
                                border-radius: 50%;
                                border: 1px solid;
                            }
                        }
                        .register-txt {
                            color: #a1a1a1;
                            font-size: 13px;
                            margin-top: 30px;
                            .register-btn {
                                cursor: pointer;
                                color: #347bcc;
                            }
                        }

                        .login-form{
                            margin-top: 20px;
                            .input{
                                width: 225px;
                                height: 45px;
                                line-height: 45px;
                                font-size: 15px;
                                /deep/ input{
                                    color: #7e7e7e;
                                    outline:none;
                                    border: solid 1px #c0c4cc;
                                }

                            }
                        }
                        .login-btn{
                            margin-top: 28px;
                            width: 225px;
                            line-height: 45px;
                            font-size: 18px;
                            padding: 0;
                            background: #1c558c;
                            color: white;
                            vertical-align: center;

                        }
                        .forgot{
                            margin-top: 50px;
                            font-size: 14px;
                            cursor: pointer;
                            color: #347bcc;
                        }
                    }
                    .register{
                        position: relative;
                        text-align: center;

                        .label{
                            text-align: left;
                            margin-top: 54px;
                            margin-left: 30px;
                            font-size: 14px;
                        }

                        .register-form{
                            margin-top: 12px;
                            .input{
                                width: 225px;
                                height: 45px;
                                line-height: 45px;
                                font-size: 15px;
                                /deep/ input{
                                    color: #7e7e7e;
                                    outline:none;
                                    border: solid 1px #c0c4cc;
                                }

                            }

                            .errmsg{
                                background: none;
                                font-size: 12px;
                                padding: 0;
                                margin-left: 36px;
                                zoom: 0.8;
                                margin-top: -20px;
                            }
                            .register-btn-box{
                                margin-top: -15px;

                                .register-btn{
                                    padding: 0;
                                    width: 225px;
                                    margin-top: -10px;
                                }
                            }

                            .validate-box{
                                width: 125px;
                                text-align: right;

                                /deep/ input{
                                    color: #7e7e7e;
                                    outline:none;
                                    border: solid 1px #c0c4cc;
                                }
                            }
                            .validate-btn{
                                padding: 0 10px;
                                font-size: 12px;
                                height: 40px;
                                color: white;
                            }
                        }
                        .login-link{
                            margin-top: 40px;
                            text-align: right;
                            padding-right: 20px;
                            font-size: 13px;

                            .go{
                                cursor: pointer;
                                color: #347bcc;
                            }
                        }
                    }
                }
            }
        }

        .copyright{
            margin: 0 auto;
            position: absolute;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            transform: translateX(-50%);
            bottom: 20px;
            font-size: 12px;
            color: #7e7e7e;
        }
    }
</style>