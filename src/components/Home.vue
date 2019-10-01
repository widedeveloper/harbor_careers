<template>
    <div class="app" v-if="loaded" ref="scrolltopview">
		<div class="mobile-menu">
        <img :src="logo" alt="Logo" class="logo" v-if="!companypage" @click="toHome">
        <img :src="logo_black" alt="Logo" class="logo" v-if="companypage" @click="toHome">
        <MenuIcon @click.native="menu = !menu" :open="menu"/>
        <Menu :style="{visibility: menu ? 'visible' : 'hidden'}" :show="menu"/>
		</div>
        <!--Section 1-->
        <div>
        <div v-if="homeSlider" v-for="(slide, index) in slideImgs" :key="index">
            <div :class="`section section-1 img-${index + 1}`" :style="{'background-image': `url(${require('../assets/images/' + slide)})`}"></div>
        </div>
        <Companys v-if="this.companypage" :action="this.companypage" ref="companypageView"/>
        <ContactForm v-if="this.contactpage" :action="this.contactAction" ref="contactActionView"/>
        </div>
        <NextIcon v-if="fullLoadedImgs" class="next" :class="{rotate: menu}" @click.native="menu ? prev() : next()"/>
        <div id="zan" :class="{open: zenOpen}"></div>
    </div>
    <!-- <Loading v-else/> -->
    <Loading @load="loaded = true" :slideImgs="slideImgs" v-else/>
</template>

<script>
import moment from 'moment'
import { Back, TweenMax } from 'gsap'

import { fromTo } from '../helpers'
import sections from '../json/sections'
import { logo, logo_black } from '../config'

import Menu from './Menu'
import MenuIcon from './MenuIcon'
import NextIcon from './NextIcon'
import Hover from './Hover'
import Button from './Button'
import ContactForm from './ContactForm'
import Companys from './Companys'
import Loading from './Loading'

import { loader } from '../helpers'

export default {
    name: 'Home',
    components: { Loading, ContactForm, Companys, Button, Hover, NextIcon, MenuIcon, Menu },
    data () {
        return {
            sections,
            logo,
            logo_black,
            step: 0,
            homeSlider:true,
            companypage:false,
            contactpage:false,
            contactAction:'/careers',
            timestamp: null,
            menu: false,
            zoom: false,
            zenOpen: false,
            loaded: false,
            slideImgs: null,
            currentImgKey: 0,
            fullLoadedImgs: false,
            dypitchLoadedImgs: false
        }
    },

    methods: {
        next () {           
            this.$refs.scrolltopview.scrollTop = 0;
            if(this.step == 0){
                this.companypage = true;
                this.contactpage = false;
                this.homeSlider = false;
                this.step = 1;            
               
            }
            else if(this.step == 1) {  
                this.contactpage = true;
                this.companypage = false;
                this.homeSlider = false;
                this.step = 2;                        
            }
            else{
                this.menu = true
                this.step = 3;
                this.homeSlider = false
            }                
        },
        prev () {
            if(this.step == 1){
                this.companypage = false;
                this.contactpage = false;
                this.homeSlider = true;
                this.step = 0;
            }
            else if(this.step == 2) {
                this.contactpage = false;
                this.companypage = true;
                this.homeSlider = false;
                this.step = 1;            
            }
            else if(this.step == 3) {
                this.menu = false
                this.step = 2;
                this.companypage = false;
                this.contactpage = true;
                this.homeSlider = false;
            }
            else{
                return
            }           
        },

        hidePrevSteps () {
            const prevSection = this.sections[this.step]
            for (const slide2 of prevSection.slides) {
                const prev = this.$refs[`slide_${prevSection.num_slides}_${slide2.id}`]
                if (prev && prev[0])
                    prev[0].style.left = '200%'
                if (slide2.text && prev[0] && prev[0].children && prev[0].children[0]) {

                    prev[0].children[0].style.visibility = 'hidden'
                }
            }
        },

        runAdditionalTransitions (section, next) {
            if (section.other_transitions) for (const transition of section.other_transitions) {
                const ref = this.$refs[`slide_${transition.section}_${transition.slide}`]
                fromTo(ref, next ? transition.from : transition.to, next ? transition.to : transition.from)
            }
        },

        animateText (section, slide) {
            const ref = this.$refs[`slide_${section.num_slides}_${slide.id}`]
            const top = slide['text-top-offset'] || '50%'
            const to = { ease: Back.easeOut.config(0.9), y: '-50%', top, visibility: 'visible' }
            const from = { top: '100%', left: '10%', right: '10%', transform: 'translate(0%, -100%)' }
            if (slide.text && ref && ref[0] && ref[0].children && ref[0].children[0]) {
                if (ref[0].children[0].tagName === 'DIV') {
                    setTimeout(() => {
                        TweenMax.fromTo(ref[0].children[0], 1, from, to)
                    }, 250)
                } else {
                    ref[0].children[0].style.visibility = 'visible'
                }

            }
        },

        getImgUrl (pet) {
            return require('../assets/images/' + pet)
        },

        scroll (e) {
            const next = e.deltaY > 0
            if (!this.timestamp || moment().diff(this.timestamp, 'ms') > 700) {

                if (next) this.next()
                else this.prev()
                this.timestamp = moment()
            }
        },

        styles (slide, index) {
            const steps = [this.step, this.step - 1, this.step - 2]
            const backgroundImage = slide['background-image'] && steps.includes(index) ?
                `url(${this.getImgUrl(slide['background-image'])})` : 'none'
            return {
                ...slide.styles,
                backgroundImage,
                textAlign: slide['text-align'] || 'center',
                backgroundColor: slide['background-color']
            }
        },

        toHome () {
            this.menu = false;
            this.zenOpen = true
            document.querySelectorAll('.slide').forEach(item => item.style.left = '-200%')
            this.step = 1
            setTimeout(() => this.zenOpen = false, 400)
        },

        runHomeSlider () {
            const images = ['.section-1.img-4', '.section-1.img-3', '.section-1.img-2', '.section-1.img-1']
            let key1 = 0
            let key2 = 1
           
            this.interval = setInterval(() => {
                this.currentImgKey = key2
                fromTo(images[key1], { left: '0' }, { left: '-100%' })
                fromTo(images[key2], { left: '100%' }, { left: '0' })
                key2 = key2 === images.length - 1 ? 0 : key2 + 1
                key1 = key1 === images.length - 1 ? 0 : key1 + 1
            }, 3000)
        }
    },
    created () {
        if (window.screen.width < 480) {
            this.slideImgs = ['dypitch-3-mobile.jpg', 'dypitch-2-mobile.jpg', 'dypitch-1-mobile.jpg', 'dypitch-0-mobile.jpg']
        } else {
            this.slideImgs = ['dypitch-3.jpg', 'dypitch-2.jpg', 'dypitch-1.jpg', 'dypitch-0.jpg']
        }

        loader([...this.slideImgs], () => {
            
            this.dypitchLoadedImgs = true
            
        })
        
    },
    mounted () {       
        const subSlideImages =  this.sections.reduce((items, item) => [
            ...items,
            ...item.slides.filter(slide => slide['background-image']).map(slide => slide['background-image'])
        ], [])
        
        loader([...subSlideImages], () => {
            
            this.fullLoadedImgs = true
            document.addEventListener('wheel', this.scroll)
        })
       
    },
    destroyed () {
        clearInterval(this.interval)
    },
    watch: {
        dypitchLoadedImgs: {           
            handler () {
                    this.runHomeSlider()
            }
        }
    },
}
</script>

<style scoped lang="scss">

    .app {
        width: 100%;
        height: 100%;
        position: relative;
        overflow-x: hidden;
        .logo {
            position: fixed;
            z-index: 100;
            width: 100px;
            left: 50px;
            top: 50px;
            cursor: pointer;
        }

        .next {
            z-index: 100;
            position: fixed;
            cursor: pointer;
            left: 50%;
            bottom: 45px;
            transform: translateX(-50%);
            transition: all 0.5s ease-in-out;
        }

        .next.rotate {
            transform: translateX(-50%) rotate(180deg);
        }

        #zan {
            transition: opacity 0.5s ease, width 0.3s ease 1s, height 0.3s ease 1s;
            position: absolute;
            background-color: #000;
        }

        #zan.open {
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        .section {
            position: absolute;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
        }

        .section-1 {
            width: 100%;
            height: 100%;
            transition: transform 2s ease;

            .content {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                color: #fff;
                bottom: 150px;
                cursor: pointer;

                h1 {
                    font-size: 65px;
                    font-weight: 700;
                    transition: all 0.3s ease;
                }

                p {
                    font-size: 28px;
                    font-weight: 400;
                    transition: all 0.3s ease;
                }
            }

            .content:hover {
                h1, p {
                    opacity: 0.8;
                    transform: matrix3d(1.03, 0, 0.00, 0, 0.00, 1.03, 0.00, 0, 0, 0, 1, 0, 0, 0, 1, 1);
                }
            }
        }

        .section-1.img-1 {
            left: 0;
        }

        .slide {
            left: 200%;
            position: absolute;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: #fff;
            font-size: 34px;
            text-align: center;

            .text {
                position: absolute;
                visibility: hidden;
                top: 100%;
                left: 50%;
                transform: translate(-50%, -100%);
                font-weight: 700;
                line-height: 44px;
            }

            .button {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);

                width: 145px;
                height: 145px;
                line-height: 145px;
                border-radius: 50%;
                box-shadow: 0px 17px 10px -10px rgba(0,0,0,0.4);
                &:hover{
                    box-shadow: 0px 37px 20px -20px rgba(0,0,0,0.2);

                }
            }
        }

        .slide.panel {
            height: 100%;
            width: 50%;
        }

        .slide.rectangle {
            height: 50%;
            width: 50%;
        }

        .slide.full {
            height: 100%;
            width: 100%;
        }

        .slide.link:hover {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .app {
            .slide {
                .text {
                    font-size: 14px;
                    line-height: 20px;
                }
            }

            .slide.full {
                .text {
                    font-size: 18px;
                }
            }

            .logo {
                left: 20px;
                top: 20px;
            }

            .next {
                z-index: 100;
                position: fixed;
                cursor: pointer;
                bottom: 20px;
                width: 50px;
                transition: all 0.5s ease-in-out;
            }

            .icon {
                right: 20px;
                top: 12px;
            }

            .slide.hidden {
                display: none;
            }

            .slide.full-mobile {
                height: 100%;
                width: 100%;
            }
			.mobile-menu {
				height: 40px;
				background-color:#8EB8C9;
				position: fixed;
				z-index: 100;
                width:100%;
				.logo {
				  width: 80px;
				  left: 30px;
				  top: 12px;
				}
			}
        }
    }
</style>
