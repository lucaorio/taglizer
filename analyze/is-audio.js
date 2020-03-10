module.exports = file => {
  const ext = file.extension
  if (
    file.type === 'file' &&
    (ext === '.flac' || ext === '.mp3' || ext === '.opus')
  )
    return true
  else return false
}
