<template>
    <router-view/>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      store: this.$root.$data.store,
      api: this.$root.$data.store.api
    }
  },
  mounted(){
    this.$nextTick(()=>{
      const updateSize = (e)=>{
        this.store.windowHeight = window.innerHeight
        this.store.windowWidth = window.innerWidth
        this.store.event_bus.$emit('resize', {height:this.store.windowHeight, width:this.store.windowWidth})
      }
      updateSize()
      //window.addEventListener('resize', updateSize);
      document.addEventListener("orientationchange", window.onresize = updateSize);

      this.store.event_bus.$on('connected', (authid)=>{
        try {
          ga('set', 'userId', authid);
        } catch (e) {
          console.error('google analytics error:', e)
        }
      })

      this.api.ga_send = (path)=>{
        try {
          ga('send', 'pageview', path);
          console.log('ga_send:', path)
        } catch (e) {
          console.error('google analytics error:', e)
        }
      }

    })
  },
  methods: {
  },
  watch: {
  	'$route': (value) => {
      // this.store.event_bus.$emit('route_changed', value)
      try {
        ga('send', 'pageview', value.path);
        console.log('pageview:', value.path)
      } catch (e) {
        console.error('google analytics error:', e)
      }
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
} */
html, body
{
    height: 100%;
    overflow-y: auto; /* has to be scroll, not auto */
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0,0,0);
}

.md-content {
  /* overflow-y: scroll;
  overflow-x: hidden; */
  padding: 1px;
}

@media screen and (max-width: 800px) {
  .md-content {
    padding: 4px;
  }
}

.md-app {
  height:100%;
}

/* .md-app-content{
  height: 100%;
} */
.md-app-container{
  width: 100%;
  height: 100%;
  overflow-x:hidden;
}

.md-menu-content{
  z-index: 9999;
}

.table-head-checkbox{
  margin-top: 5px;
  width: 50px;
}

.md-subheader {
  font-size: 22px;
  font-weight: 300;
}

.md-input {
  font-size: 16px !important;
}

.md-dialog-container {
  overflow: auto !important;
}

.md-app.md-fixed .md-app-scroller{
  z-index: 0 !important;
}

.md-app-scroller {
    flex: 1;
    max-height: calc( 100vh - 60px);
}
</style>
