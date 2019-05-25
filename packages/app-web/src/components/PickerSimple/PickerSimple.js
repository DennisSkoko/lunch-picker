import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import ContentFullscreen from '../ContentFullscreen'
import Text from '../Text'

const ITERATIONS = 15
const ITERATION_INTERVAL = 150

function random (length) {
  return () => Math.round(Math.random() * length)
}

function loop (iterations, setIndex, random) {
  ++iterations.current

  if (iterations.current < ITERATIONS) {
    setIndex(currentIndex => {
      let newIndex = null

      do { newIndex = random() }
      while (currentIndex === newIndex)

      return newIndex
    })

    setTimeout(() => {
      loop(iterations, setIndex, random)
    }, ITERATION_INTERVAL)
  }
}

function PickerSimple ({ items }) {
  const iterations = useRef(0)
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(random(items.length - 1)())

  const handleClick = () => {
    setActive(true)

    setTimeout(() => {
      loop(iterations, setIndex, random(items.length - 1))
    }, ITERATION_INTERVAL)
  }

  return (
    <ContentFullscreen>
      {active && <Text>{items[index]}</Text>}
      {!active && <Button onClick={handleClick}>Start</Button>}
    </ContentFullscreen>
  )
}

PickerSimple.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PickerSimple
