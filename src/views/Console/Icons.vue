<template>
    <div id="icons">
        <div v-for="item in icons" :key="item" class="icons-wrap">
            <svg-icon :icon-class="item | myFilter" :class-name="item"></svg-icon>
            <label>{{item | myFilter}}</label>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Icons",
        data() {
            return {
                icons: []
            }
        },
        created() {
            const req = require.context('../../icons/svg', false, /\.svg$/);
            const requireAll = requireContext => {
                // console.log(requireContext.keys());
                return requireContext.keys();
            }
            this.icons = requireAll(req);
            // console.log(this.icons);
        },
        filters: {
            myFilter: (item) => {
                return item.substr(2, item.length - 6);
            }
        }
    }
</script>

<style scoped lang="scss">
#icons{
    display: flex;
    flex-wrap: wrap;

    .icons-wrap{
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        border: 1px solid #344a5f;
        margin: 5px;
        border-radius: 8px;
        cursor: pointer;

        &:hover{
            background: #96ffd0;
            color: white;
            border: solid 1px red;
        }

        svg{
            font-size: 40px;
            margin: 19px auto 10px auto;
        }

        lable{
            margin: 0 auto;
        }
    }
}
</style>