<template>
    <a class="hover" :href="url">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 168 168" enable-background="new 0 0 168 168" xml:space="preserve">
            <g id="Layer_2"></g>
            <g id="Layer_1">
                <polygon fill="#231F20" points="133,79 89,79 89,35 79,35 79,79 35,79 35,89 79,89 79,133 89,133 89,89 133,89 "></polygon>
                <path fill="#231F20" d="M84,10c40.8,0,74,33.2,74,74s-33.2,74-74,74s-74-33.2-74-74S43.2,10,84,10 M84,0C37.61,0,0,37.61,0,84s37.61,84,84,84s84-37.61,84-84S130.39,0,84,0L84,0z"></path>
            </g>
        </svg>
    </a>
</template>

<script>
export default {
    name: 'Hover',
    props: ['url']
}
</script>

<style scoped lang="scss">
    .hover {
        display: block;
        width: 100%;
        height: 100%;
        transition: all 0.4s ease-in-out;
    }

    .hover:hover {
        opacity: 1;
        background-color: #ffffff99;
        cursor: pointer;
        svg {
            opacity: 1;
            transform:  translateY(-50%) rotate(90deg);
        }
    }

    svg {
        position: absolute;
        width: 60px;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.2s ease-in-out;
        transition-delay: 0.2s;
        opacity: 0;
    }
</style>
