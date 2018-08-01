const fs = require('fs')
const path = require('path')

// 读取单个文件
function readfile(inDir, filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(inDir, filename), 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data.replace(/<\?xml.*?\?>|<\!--.*?-->|<!DOCTYPE.*?>/g, ''),
      })
    })
  })
}

// 读取SVG文件夹下所有svg
function readSvgs(inDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(inDir, function (err, files) {
      if (err) {
        reject(err)
      }
      Promise.all(files.map(filename => readfile(inDir, filename)))
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  })
}

module.exports = function (inDir, outFile) {
  const cwd = process.cwd()
  inDir = path.join(cwd, inDir, '/')
  outFile = path.join(cwd, outFile)
  // 生成js文件
  readSvgs(inDir)
    .then(data => {
      let svgFileString = 'export default ' + JSON.stringify(Object.assign.apply(this, data))
      fs.writeFile(outFile, svgFileString, function (err) {
        if (err) {
          throw new Error(err)
        }
        console.log('success!')
      })
    }).catch(err => {
      throw new Error(err)
    })
}