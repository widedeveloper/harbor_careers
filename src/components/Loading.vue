<template>
    <div class="black">
        <div class="loading"></div>
    </div>
</template>

<script>

//import slides from '../json/sections'
import { loader } from '../helpers'

export default {
    name: 'Loading',
    props: {
        slideImgs: {
            required: true,
            type: Array
        }
    },
    created () {      
        // const slideImages = slides.reduce((items, item) => [
        //     ...items,
        //     ...item.slides.filter(slide => slide['background-image']).map(slide => slide['background-image'])
        // ], [])
        const firstImage = ['dypitch-0.jpg']
        loader([...firstImage], () => this.$emit('load'))
    }
}
</script>

<style scoped>

    .black {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        background-color: #000;
    }

    .loading {
        width: 0;
        height: 2px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        animation-name: load;
        animation-duration: 30s;
    }

    @keyframes load {
        0% {
            width: 0;
        }
        25% {
            width: 50%;
        }
        50% {
            width: 70%;
        }
        60% {
            width: 80%;
        }
        70% {
            width: 90%;
        }
        75% {
            width: 92%;
        }
        80% {
            width: 94%;
        }
        85% {
            width: 94%;
        }
        95% {
            width: 96%;
        }
        100% {
            width: 98%;
        }
    }
</style>
