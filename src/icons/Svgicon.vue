<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    export default {
        name: "Svgicon",
        data(){
            return {

            }
        },
        props: ['iconClass', 'className'],
        computed:{
            svgClass(){
                if (this.$props.className){
                    return `svg-icon ${this.$props.className}`;
                } else {
                    return `svg-icon`;
                }
            },
            iconName(){
                return `#icon-${this.$props.iconClass}`;
            }

        }
    }
</script>

<style scoped lang="scss">
    .svg-icon{
        width: 1em;
        height: 1em;
        fill: currentColor;
        &.font12{
            font-size: 12px;
        }
    }
</style>