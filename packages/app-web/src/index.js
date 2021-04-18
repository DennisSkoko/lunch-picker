/**
 * @param {number} duration
 */
const wait = duration => new Promise(resolve => {
  setTimeout(resolve, duration)
})

const foo = async () => {
  await wait(process.env.NODE_ENV === 'production' ? 300 : 800)
  return [['msg', 'Hello']]
};

foo().then(entries => {
  const text = document.createElement('h1')
  const asd = Object.fromEntries(entries);

  text.innerText = asd.msg

  document.querySelector('body')?.appendChild(text)
})
