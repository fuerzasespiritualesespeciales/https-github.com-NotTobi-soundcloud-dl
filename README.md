Download this extension from the [Firefox Add-Ons page](https://addons.mozilla.org/en-US/firefox/addon/soundcloud-dl).

## Missing features

- When downloading high quality .m4a audio files, the Artwork is not set
- Download buttons in more locations, than just on the track page
- Download playlists/albums/favorites
- Better error handling -> also displaying errors to the user

If you want to help implement them, go right ahead! :)

## Building the addon

## Operating system used

Linux 5.5.15-1-MANJARO

_Any other operating system should do just fine, since Node is widely supported_

### Software/Tooling used

- Node v13.12.0 - [Installation instructions](https://nodejs.org/en/download/)
- yarn v1.22.4 - [Installation instructions](https://classic.yarnpkg.com/en/docs/install)

### Build process

To build the addon run the `create-dist.sh` script.

The build artifact `SoundCloud-Download.zip` can be found in the `dist` directory.
