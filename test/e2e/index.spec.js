import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before(async () => {
  const config = {
    dev: false,
    rootDir: resolve(__dirname, '../../'),
  }
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  await nuxt.server.listen(4000, 'localhost')
}, 30000)

// Example of testing only generated html
test('reroll map', async (t) => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const button = window.document.querySelector('#reroll-map')
  t.not(button, null)
  t.is(button.textContent.trim(), 'reroll map')

  const label = window.document.querySelector('#map-name')
  t.not(label, null)
  const mapName = label.textContent.trim()

  const source = window.document.querySelectorAll('source')[1]
  t.not(source, null)
  const mapUrl = source.getAttribute('srcset')

  button.click()
  setTimeout(function () {
    t.not(source.getAttribute('srcset'), mapUrl)
    t.not(label.textContent.trim(), mapName)
  }, 2000)
})

test('scramble teams', async (t) => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const button = window.document.querySelector('#scramble-teams')
  t.not(button, null)
  t.is(button.textContent.trim(), 'scramble teams')
  const inputs = [...window.document.querySelectorAll('input')]
  const inputsValue = inputs.map((input) => {
    return input.value
  })
  button.click()
  const inputsValueAfter = inputs.map((input) => {
    return input.value
  })
  setTimeout(function () {
    t.false(inputsValue.every((val, index) => val === inputsValueAfter[index]))
  }, 2000)
})

test('scramble att agents', async (t) => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const button = window.document.querySelector('#reroll-att-agents')
  t.not(button, null)
  t.is(button.textContent.trim(), 'reroll agents')
  const att = window.document.querySelector('#attackers')
  const imgs = [...att.querySelectorAll('img')]
  const imgsValue = imgs.map((img) => {
    return img.getAttribute('alt')
  })
  button.click()
  const imgsValueAfter = imgs.map((img) => {
    return img.getAttribute('alt')
  })
  setTimeout(function () {
    t.false(imgsValue.every((val, index) => val === imgsValueAfter[index]))
  }, 2000)
})

test('scramble def agents', async (t) => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const button = window.document.querySelector('#reroll-def-agents')
  t.not(button, null)
  t.is(button.textContent.trim(), 'reroll agents')
  const att = window.document.querySelector('#defenders')
  const imgs = [...att.querySelectorAll('img')]
  const imgsValue = imgs.map((img) => {
    return img.getAttribute('alt')
  })
  button.click()
  const imgsValueAfter = imgs.map((img) => {
    return img.getAttribute('alt')
  })
  setTimeout(function () {
    t.false(imgsValue.every((val, index) => val === imgsValueAfter[index]))
  }, 2000)
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', (t) => {
  nuxt.close()
})
