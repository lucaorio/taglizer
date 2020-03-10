const dirtree = require('directory-tree')
const mm = require('music-metadata')
const isAudio = require('./is-audio')
const cleanTracks = require('./clean-tracks')
const cleanMetadata = require('./clean-metadata')

// return an organized array of albums/artist/tracks/metadata
module.exports = async root => {
  const tree = getTree(root).children
  return await getArtists(tree)
}

// get general directories/files structure
const getTree = folder =>
  dirtree(folder, {
    extensions: /\.(flac|mp3|opus)$/,
  })

// get/clean artists structure
const getArtists = async tree =>
  await Promise.all(
    tree.map(async artist => ({
      name: artist.name,
      albums: await getAlbums(artist.children),
    }))
  )

// get/clean albums structure
const getAlbums = async albums =>
  await Promise.all(
    albums.map(async album => ({
      name: album.name,
      tracks: await getTracks(album.children),
    }))
  )

// get/clean tracks structure
const getTracks = async tracks =>
  // clean structure from null elements
  cleanTracks(
    await Promise.all(
      tracks.map(async track => {
        // check if we're dealing with an audio file
        if (isAudio(track)) {
          return {
            name: track.name,
            // get/clean audio metadata (async)
            tags: cleanMetadata(await mm.parseFile(track.path)),
          }
        } else {
          return null
        }
      })
    )
  )
