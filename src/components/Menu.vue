<template>
    <div class="menu" :style="{opacity: show ? 1 : 0 }">
        <div class="items">
            <div class="item" v-for="(item, index) in menu" :key="item.text">
                <a :href="item.url" :style="{opacity: show ? 1 : 0, transitionDelay: `0.${index}s` }">{{ item.text }}</a>
                <div class="line" :style="{width: show ? '100%' : 0, transitionDelay: `0.${index}s` }" v-if="index < menu.length - 1"></div>
            </div>
        </div>
        <div class="social-icons">
            <a href="https://twitter.com/HarborRetail" target="_blank"><img class="social-icon" src="../assets/images/twitter.png" alt=""></a>
            <a href="https://www.linkedin.com/company/harbor-industries/" target="_blank"><img class="social-icon" src="../assets/images/linkedin.png" alt=""></a>
            <a href="https://www.instagram.com/harborexplores/" target="_blank"><img class="social-icon" src="../assets/images/instagram.png" alt=""></a>
        </div>
    </div>
</template>

<script>
import menu from '../json/menu'

export default {
    name: 'Menu',
    props: ['show'],
    data () {
        return {
            menu
        }
    }
}
</script>

<style scoped lang="scss">
    .menu {
        position: fixed;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: black;
        transition: all 0.5s ease-in-out;
        left: 0;
        top: 0;
        .social-icons{
            position: fixed;
            bottom: 80px;
            right: 80px;
            width: 50px;
            .social-icon{
                height: 30px;
                width: 30px;
                margin: 15px;
            }
            .social-icon:hover{
                opacity: 0.7;
            }
        }
        .items {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 480px;

            .item {
                text-align: center;

                a {
                    display: block;
                    color: #fff;
                    text-decoration: none;
                    font-size: 40px;
                    font-weight: 700;
                    margin: 20px;
                    transition: all 0.5s ease-in-out;
                }

                a:hover {
                    color: #ccc;
                    transform: matrix3d(1.03, 0, 0.00, 0, 0.00, 1, 0.00, 0, 0, 0, 1, 0, 0, 0, 1, 1);
                }

                .line {
                    width: 100%;
                    height: 1px;
                    background-color: #dadada;
                    transition: all 0.5s ease-in-out;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .menu{
            .items {
                width: 60% !important;
                .item {
                    a {
                        font-size: 25px!important;
                    } 
                }
                
            }
			.social-icons{
				right: 20px;
			}
        }        
    }
    

</style>
