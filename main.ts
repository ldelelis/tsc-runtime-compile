import * as chokidar from 'chokidar'
import * as cp from 'child_process'
import data from './tsconfig.json'

const COMPILED_MODULES_DIR = './watched/*.ts'
const MODULES_DIR = '../watched'

const outDir = data.compilerOptions.outDir

let newModule
let directory
let extension
let compiledFile

chokidar.watch(COMPILED_MODULES_DIR).on('all', (event, path) => {
    console.log(event)
    console.log(path)

    directory = path.split('/')[0]
    compiledFile = `${path.split('/')[1].split('.')[0]}`

    console.log(outDir)
    console.log(directory)
    console.log(compiledFile)

    if (event === 'add') {
        cp.exec(`tsc ${path} --outDir ${outDir}/${directory}`, (err, stdout) => {
            newModule = require(`./${directory}/${compiledFile}`)
            newModule.henlo()
        })
    }
})

