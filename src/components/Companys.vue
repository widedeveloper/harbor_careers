<template>
    <div class = "companies-app" ref="companiesView">
        <div class="title">Most companies call these benefits. <br> Harbor calls these mandatories.</div>
        <div class = "gallerys">
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-stack.jpg')})`}">
                <div class="company-title">Full Benefits Stack</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-401k.jpg')})`}">
                <div class="company-title">401(k) with Harbor contribution</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-pto.jpg')})`}">
                <div class="company-title">PTO & Paid Holidays<br>to relax & recharge</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-dev_train.jpg')})`}">
                <div class="company-title">Professional development &<br>trainings</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-emp_assist.jpg')})`}">
                <div class="company-title">Employee Assistance Programs</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-fitness.jpg')})`}">
                <div class="company-title">Onsite fitness facilities</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-office.jpg')})`}">
                <div class="company-title">Standing desks, remote officing,<br>premium manufacturing<br>technology & more</div>
            </div>
            <div class="company-images" :style="{'background-image': `url(${require('../assets/images/company/benefits-dog.jpg')})`}">
                <div class="company-title">Events, par-tays, fundraisers &<br>dog friendly office days</div>
            </div>
        </div>
    </div>
</template>

<script>
import { token } from '../config'

export default {
    name: 'Companys',
    props: ['action'],
    data () {
        return {
            token: encodeURIComponent(window.btoa(token))
        }
    }
}
</script>

<style scoped lang="scss"> 
    .companies-app {
        .title{
            text-align: center;
            font-size: 32px;
            line-height: 1.3;
            color: #89B8CB;
            padding: 40px 30px 0 30px;
        }
        .gallerys{
            padding:20px 0;
            text-align:center;
            margin:auto;
            .company-images{
                width:24%;
                min-width:270px;
                height:calc((100vh - 400px) / 2);
                min-height: 230px;
                margin:5px;
                margin-bottom: 90px;
                display: inline-block;
                background-size: cover;
                background-position: center;
                position:relative;
                .company-title{
                    position: absolute;
                    left: 0;
                    bottom: -80px;
                    width: 100%;
                    height: 80px;
                    background-color: #231F20;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #D9D1CF;
                    line-height: 1.2;
                    font-size: 16px;

                }
            }
        }  
    }
    
    @media (max-width: 568px) {
        .companies-app {
            .title{
                padding: 75px 40px 40px 40px;
            }
            .gallerys{
                .company-images{
                    min-width:90%;
                }
            }
        }

    }
</style>
