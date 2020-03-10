const fs = require('fs-extra')
const chalk = require('chalk')
const pug = require('pug')
const untildify = require('untildify')
var pkg = require('../package.json')
const getDiscography = require('./get-discography')

;(async () => {
  // get an organized array of albums/artist/tracks/metadata
  const discography = await getDiscography(untildify(pkg.config.root))

  // compile a pug file
  const compile = pug.compileFile('./analyze/discography.pug')
  const html = compile({ discography: discography })

  // save the results in a html
  await fs.outputFile(pkg.config.output, html)
  console.log(chalk.green(`HTML generated succesfully at ${pkg.config.output}`))
})()
