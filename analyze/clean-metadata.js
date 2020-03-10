module.exports = metadata => {
  if (metadata.common.picture) {
    for (let picture of metadata.common.picture) {
      picture.data = true
    }
  }

  return metadata.common
}
