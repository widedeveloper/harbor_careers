<template>
    <a :href="url">{{ text }}</a>
</template>

<script>
export default {
    name: 'Button',
    props: ['text', 'url']
}
</script>

<style scoped>
    a {
        display: inline-block;
        /*width: 80px;*/
        height: 30px;
        text-decoration: none;
        background-color: #f8cc46;
        opacity: 1;
        font-size: 20px;
        color: #fff;
        padding: 15px 20px;
        line-height: 30px;
        margin-bottom: 40px;
    }
</style>
