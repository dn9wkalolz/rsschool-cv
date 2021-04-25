function delay(delayTime) {
  return new Promise((resolve) => setTimeout(resolve, delayTime))
}

async function delayedDelete(word, elem) {
  const wordArr = word.split('')
  for (let i = 0; i < word.length; i++) {
    await delay(100)
    wordArr.pop()
    elem.innerText = wordArr.join('')
  }
}

async function delayedPrint(word, elem) {
  const wordArr = word.split('')
  for (let i = 0; i < word.length; i++) {
    await delay(200)
    elem.innerText += wordArr.shift()
  }
}

export async function print(textArray, elem) {
  for (const word of textArray) {
    await delayedPrint(word, elem)
    await delayedDelete(word, elem)
  }
  print(textArray, elem)
}
