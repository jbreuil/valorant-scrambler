import { shallowMount } from '@vue/test-utils'
import test from 'ava'
import Map from '../../components/Map'

test('renders map image and map name', (t) => {
  const map = 'bind'
  const wrapper = shallowMount(Map, {
    propsData: {
      map,
    },
  })

  const picture = wrapper.find('picture')
  t.truthy(picture.exists())

  const source = picture.find('source')
  t.truthy(source.exists())
  t.is(source.attributes('srcset'), '/icons/maps/bind.webp')

  const img = picture.find('img')
  t.truthy(img.exists())
  t.is(img.attributes('src'), '/icons/maps/bind.png')

  const name = wrapper.find('#map-name')
  t.truthy(name.exists())
  t.is(name.text(), 'bind')
})
