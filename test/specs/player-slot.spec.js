import { shallowMount } from '@vue/test-utils'
import test from 'ava'
import PlayerSlot from '../../components/PlayerSlot'

test('renders map image and map name', (t) => {
  const value = 'player'
  const variant = 'blue'
  const agent = 'omen'
  const wrapper = shallowMount(PlayerSlot, {
    propsData: {
      value,
      variant,
      agent,
    },
  })

  const picture = wrapper.find('picture')
  t.truthy(picture.exists())
  t.is(picture.attributes('class'), 'border-blue-600 border-l-4')

  const source = picture.find('source')
  t.truthy(source.exists())
  t.is(source.attributes('srcset'), '/icons/agents/omen.webp')

  const img = picture.find('img')
  t.truthy(img.exists())
  t.is(img.attributes('src'), '/icons/agents/omen.png')

  const name = wrapper.find('input')
  t.truthy(name.exists())
  t.is(name.attributes('class'), 'slot bg-blue-300')
  t.is(name.element.value, 'player')
  name.setValue('doom')
  t.is(name.element.value, 'doom')
})
