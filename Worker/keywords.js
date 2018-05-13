import keyword_extractor from 'keyword-extractor'

let keyword = function(text) {
  return new Promise((resolve, reject) => {
    let keys = keyword_extractor.extract(text, {
      language: 'french',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    resolve(keys)
  })
}

export default keyword