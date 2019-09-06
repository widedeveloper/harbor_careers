<template>
    <div class="icon" :class="{open: open}">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
        <div class="line line-4"></div>
    </div>
</template>

<script>
export default {
    name: 'MenuIcon',
    props: ['open']
}
</script>

<style scoped lang="scss">
    @keyframes example {
        0% {
            width: 100%;
        }
        50% {
            width: 80%;
        }
        100% {
            width: 100%;
        }
    }

    .icon {
        position: absolute;
        right: 70px;
        top: 50px;
        width: 30px;
        height: auto;
        cursor: pointer;
        z-index: 100;

        .line {
            width: 100%;
            height: 3px;
            margin-bottom: 4px;
            background-color: #dadada;
            transition: width 0.3s ease;
        }

        .line-1 {
            transition-delay: 0.1s;
        }

        .line-2 {
            transition-delay: 0.2s;
        }

        .line-4 {
            transition-delay: 0.3s;
        }

        .line-3 {
            height: 0;
            margin: 0;
            transform: translateY(-100%);
        }

        .line-1, .line-4 {
            transition: width 0.3s ease 0.2s;
        }

        .line-2, .line-3 {
            transition: transform 0.2s ease 0s;
        }
    }

    .icon:not(.open):hover {
        .line {
            animation-name: example;
            animation-duration: 0.3s;
        }

        .line-1 {
            animation-delay: 0.1s;
        }

        .line-2 {
            animation-delay: 0.2s;
        }

        .line-4 {
            animation-delay: 0.3s;
        }
    }

    .icon.open {
        .line-2 {
            margin-bottom: 0;
            transform: rotate(-45deg);
        }

        .line-3 {
            height: 3px;
            transform: translateY(-2px) rotate(45deg);
        }

        .line-1, .line-4 {
            width: 0;
            transition: width 0.3s ease;
        }

        .line-2, .line-3 {
            transition: transform 0.2s ease 0.2s;
        }
    }
</style>
