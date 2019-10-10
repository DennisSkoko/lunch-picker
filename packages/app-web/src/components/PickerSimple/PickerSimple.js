import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import ContentFullscreen from '../ContentFullscreen'
import Text from '../Text'

const ITERATIONS = 15
const ITERATION_INTERVAL = 150

function random (length) {
  return Math.round(Math.random() * length)
}

function PickerSimple ({ items }) {
  const loopId = useRef(null)
  const iterations = useRef(0)
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(random(items.length - 1))

  const loop = () => {
    ++iterations.current

    if (iterations.current < ITERATIONS) {
      setIndex(currentIndex => {
        let newIndex = null

        do { newIndex = random(items.length - 1) }
        while (currentIndex === newIndex)

        return newIndex
      })

      loopId.current = setTimeout(() => {
        loop()
      }, ITERATION_INTERVAL)
    }
  }

  const handleTextClick = () => {
    setActive(false)
    iterations.current = 0
    clearTimeout(loopId.current)
  }

  const handleButtonClick = () => {
    setActive(true)

    loopId.current = setTimeout(() => {
      loop()
    }, ITERATION_INTERVAL)
  }

  return (
    <ContentFullscreen>
      {active && <Text size='xl' onClick={handleTextClick}>{items[index]}</Text>}
      {!active && <Button onClick={handleButtonClick}>Start</Button>}
    </ContentFullscreen>
  )
}

PickerSimple.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PickerSimple
