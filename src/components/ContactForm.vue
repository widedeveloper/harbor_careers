<template>
    <div class = "contact-app" ref="contactView">
        <div class="title">
            <h2>Interested?</h2>
            Join us.
        </div>
        <div class="contain">
            <div class="form-details">
                <h3>Make a great career move.</h3>
                <p>Ready for a change? Working with Harbor Retail will give you a chance to do some of the most influential retail work of your career.</p>
                <p>We’ve been designing, developing, engineering and manufacturing retail experiences since the 1940’s...and still innovating.</p>
                <p>We’re growing quickly and are always adding to our virtual bench. We invite you to send us your resume, even if you don’t see an open position
                that’s a match. The world of experiential retail moves quickly. Tomorrow, we might need someone exactly like you.</p>
                <p>Please visit below to see a list of open positions:</p>
                <a href="https://www.ziprecruiter.com/c/Harbor-Industries/Jobs" target="_blank"><h2>[ OPEN POSITIONS ]</h2></a>
            </div>
            <form @submit.prevent="handleSubmit" data-netlify-recaptcha data-netlify>
                    <label>First Name*</label>
                    <input type="text" name="name" v-model="name" title="Name" placeholder="Name" required>

                    <label>Tell us about your experience:</label>
                    <textarea rows="8" name="message" v-model="message" title="Message" placeholder="Message" required></textarea>

                    <label>Upload Resume* (doc, docx, pdf)</label>
                    <input type="file" name="file" title="file" @change="selectedFile($event)" required/>
                <div class="form-group">
                    <button v-on:click="submitFunction" type="submit">[ SEND ]</button>
                </div>
                <div v-if="messageShow" class="alert-message">
                     <label >{{this.messageText}}</label>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { token } from '../config'
import axios from 'axios'


export default {
    name: 'ContactForm',
    props: ['action'],
    data(){
        return {
            file:null,
            messageShow:false,
            messageText:""
        }
    },
    methods:{
        submitFunction : function (event){  
        },
        selectedFile(event) {
            this.file = event.target.files[0]
        },
        handleSubmit:function(){
            let me = this;
            
            let formdata = new FormData();
            formdata.append("your-name", this.name);
            formdata.append("your-message", this.message);
            formdata.append("file-upload", this.file);
            var currentUrl = window.location.pathname;
            axios.post(currentUrl+'../wp-json/contact-form-7/v1/contact-forms/15656/feedback', formdata,
            {
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Cache-Control':'no-cache'
                }
            })
            .then(function(response){
                console.log(response.data.message,response.message);
                me.messageText = response.data.message;
                me.messageShow = true;
            })
            .catch(function (error){
                me.messageText = error;
            })
        }
    }
}
</script>

<style scoped lang="scss"> 
    .contact-app {
        width: 100%;
        position: relative;
        min-height: 100vh;
        background-color: #FFCC00;
        .title{
            padding: 40px 40px 0;
            font-size: 72px;
            text-align: center;
            color: #231F20;
            h2{
                font-size: 40px;
                color: white;
            }
        }
        .contain{
            display: table;
            max-width: 1200px;
            margin: auto;
            justify-content: center;
            justify-items: center;
            .form-details{
                    display: inline-block;
                    max-width: 500px;
                    padding: 0 30px;
                    color: #231f20;
                h3{
                    font-size: 30px;
                    line-height: 2;
                }
                p{
                    font-size: 20px;
                    line-height: 1.2;
                    padding-bottom: 24px;
                }
                a{
                    text-decoration: none;
                }
                h2{
                    font-size: 36px;
                    line-height: 2;
                    font-weight: bold;
                    color: #FF460F;
                }
            }
            form {
                display: inline-block;
                max-width: 500px;
                padding: 0 30px;
                color: #231f20;     
                input, textarea {
                        width: 100%;
                        background-color: #fff;
                        color: #000;
                        border: 1px solid #000;
                        outline: none;
                        font-size: 20px;
                        padding: 12px 20px;
                        box-sizing: border-box;
                }
                label{
                    font-size: 20px;
                    line-height: 2;
                }

                input::placeholder, textarea::placeholder {
                    color: #FFF;
                }

                input:focus, textarea:focus {
                    border-bottom: 2px solid #FFF;
                    opacity: 1;
                }

                button {
                        background-color: transparent;
                        border: none;
                        cursor: pointer;
                        font-size: 36px;
                        line-height: 2;
                        font-weight: bold;
                        color: #FF460F;
                }

                button:hover, button:focus {
                    opacity: 0.8;
                }
                .alert-message{
                    text-align: center;
                    label{
                        color: red;
                    }
                }
        }
        }
        
    }

    @media (max-width: 1100px) {
            .contain{
                display:grid !important;            
            }
        }

    @media (max-width: 768px) {
        .contact-app {
            .title{
                padding: 80px 40px 40px 40px;
            }
            .contain{
                .form-details{
                        display: inline-block;
                        max-width: 500px;
                        padding: 0 30px;
                        color: #231f20;
                    h3{
                        font-size: 24px;
                        line-height: 2;
                        letter-spacing: 0;
                    }
                    p{
                        font-size: 16px;
                        line-height: 1.2;
                        padding-bottom: 13px;
                    }
                    h2{                        
                        font-size: 28px;
                        line-height: 2;
                        font-weight: bold;
                        color: #FF460F;
                        text-align: center;
                    }
                }
                form {
                    label{
                        font-size: 16px;
                    }
                    .form-group{
                        text-align:center;
                        padding-bottom: 100px;
                    }

                }
            }
        }
    }
</style>
