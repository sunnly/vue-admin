<template>
    <div id="layout-wrap" :class="isClose ? 'nav-close':'nav-open'">
        <su-header/>
        <su-nav/>
        <su-main/>
    </div>
</template>

<script>
    import SuHeader from './components/Header';
    import SuMain from './components/Main';
    import SuNav from './components/Nav';
    export default {
        name: "Index",
        components: {
            SuHeader,
            SuMain,
            SuNav
        },
        computed:{
            isClose(){
                return this.$store.state.app.isCollapse
            }
        }

    }
</script>

<style scoped lang="scss">
#layout-wrap{
    background: #f7f7f7;
    width: 100%;
    height: 100%;

    &.nav-close{

    }
}
</style>