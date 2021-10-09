export const state = () => ({
    openMenu: false,
    openNavigator: false
})
export const mutations = {
    SET_OPENMENU(state, val) {
        state.openMenu = val;
    },
    SET_OPEN_NAVIGATOR(state, val) {
        state.openNavigator = val;
    }
}
export const actions = {
    toggleMobileMenu() {
        const bodyEl = document.querySelector('body')
        let scrollPosition = 0
        const appEl = document.getElementById('app')
        const appWrapperEl = document.getElementById('App-Wrapper')
        const appMobileEl = document.getElementById('App-Mobile-Profile')
        if (appEl && appWrapperEl && appMobileEl && bodyEl) {
            if (this.openMenu === false) {
                scrollPosition = window.pageYOffset
                bodyEl.style.overflow = 'hidden'
                bodyEl.style.position = 'fixed'
                bodyEl.style.top = `-${scrollPosition}px`
                bodyEl.style.width = '100%'

                appEl.style.overflow = 'hidden'
                appEl.style.maxHeight = '100vh'
                appWrapperEl.style.borderRadius = '16px'
                appWrapperEl.style.overflow = 'hidden'
                appWrapperEl.style.maxHeight = '100vh'
                appWrapperEl.style.minHeight = '100vh'
                appWrapperEl.style.transform =
                    'translate3d(302px, 0px, 0px) scale3d(0.86, 0.86, 1)'
                setTimeout(() => {
                    appMobileEl.style.opacity = '1'
                    appMobileEl.style.transform = 'translateY(0)'
                }, 200)
                this.openMenu = true
            } else {
                bodyEl.style.removeProperty('overflow')
                bodyEl.style.removeProperty('position')
                bodyEl.style.removeProperty('top')
                bodyEl.style.removeProperty('width')
                window.scrollTo(0, scrollPosition)

                appMobileEl.style.opacity = '0'
                appMobileEl.style.transform = 'translateY(-20%)'

                appWrapperEl.style.transform =
                    'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)'
                appWrapperEl.style.borderRadius = '0'

                setTimeout(() => {
                    appEl.style.overflow = 'auto'
                    appEl.style.maxHeight = 'initial'
                    appWrapperEl.style.overflow = 'auto'
                    appWrapperEl.style.maxHeight = 'initial'
                    appWrapperEl.style.minHeight = 'initial'
                    appWrapperEl.style.transform = 'none'
                    this.openMenu = false
                }, 376)
            }
        }
    },
    toggleOpenNavigator({ commit }) {

        this.openNavigator = !this.openNavigator
        commit("SET_OPEN_NAVIGATOR", this.openNavigator)

    },
    setOpenNavigator({ commit }, status) {
        commit("SET_OPEN_NAVIGATOR", status)
    }
}
