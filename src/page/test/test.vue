<template>
    <div class="testContainer">
        <head-top :head-title="'演示测试'" goBack="false">
            
        </head-top>
        <form class="testForm">
            <section class="input_container">
                <input type="text" placeholder="客户号码" v-model.lazy="called">
            </section>
            <section class="input_container">
                <input type="text" placeholder="显示号码"  readonly v-model="caller">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="test_tips">
            温馨提示：本页面仅用于客户演示使用
        </p>
        <div class="test_container" @click="sendTest">发送</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {sendTest, getcaptchas} from '../../service/getData'

    export default {
        data(){
            return {
                called: null, //被叫号码
                caller: null, //显示号码
                fileName:null,  //文件名
                pathParam:null, //路径参数
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            this.getCaptchaCode();
            //先写死主叫号码
            this.caller="17760787621";
            this.fileName="1";
            this.pathParam="00,00,:385";
        },
        components: {
            headTop,
            alertTip,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.called)
            }
        },
        methods: {
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res;
            },
            //发送登录信息
            async sendTest(){
                if (!this.called) {
                    this.showAlert = true;
                    this.alertText = '请输入客户号码';
                    return
                }else if(!this.caller){
                    this.showAlert = true;
                    this.alertText = '主叫号码';
                    return
                }else if(!this.codeNumber){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //用户名登录
                let res = await sendTest(this.called, this.caller,
                    this.fileName,this.pathParam, this.codeNumber);
                if(res.retCode==100){//成功
                    this.alertText = '调用成功！';
                }
                else{
                    this.alertText = res.errMessage;
                }
                this.showAlert = true;
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .testContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }


    .testForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .test_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .test_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>
