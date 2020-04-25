const app ={
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
    },
    mutations: {
        changeCollapse(state){
            state.isCollapse = !state.isCollapse;
            sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
        }
    },
    actions: {
        setMuneStatus(content, data){
            content.commit("changeCollapse");
        }
    },
    modules: {}
}
export default app;