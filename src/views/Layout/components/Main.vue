<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped lang="scss">
#main-wrap{
    background: white;
    position: fixed;
    left: $navWidth + 30px;
    right: 30px;
    top: $headerHeight + 30px;
    bottom: 0;
    @include webkit(transition,all 0.3s ease 0s);
}
.nav-open #main-wrap{
    left: $navWidth + 30px;
}
.nav-close #main-wrap{
    left: $navMinWidth + 30px;
}
</style>