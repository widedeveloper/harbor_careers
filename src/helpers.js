import { TweenMax } from 'gsap'

const fromTo = (el, from, to, time = 0.5) => {
    return new Promise((resolve) => {
        const hand = TweenMax.fromTo(el, time, from, to)
        hand.eventCallback('onComplete', () => {
            resolve()
        })
    })
}

const loader = (items, allDone) => {
    if (!items) return
    if ('undefined' === items.length) items = [items]
    let count = items.length
    const thingToDoCompleted = items => {
        count--
        if (0 === count) allDone(items)
    }

    for (let i = 0; i < items.length; i++) {
        loadImage(items, i, thingToDoCompleted)
    }
}

const loadImage = (items, i, onComplete) => {
    const onLoad = e => {
        e.target.removeEventListener('load', onLoad)
        onComplete(items, i)
    }
    const img = new Image()
    img.addEventListener('load', onLoad, false)
    img.src = require('./assets/images/' + items[i])
}


export {
    fromTo,
    loader
}
