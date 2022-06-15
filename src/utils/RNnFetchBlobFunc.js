import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;

const downloadSong = (url, fileName) => {
  RNFetchBlob.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: dirs.DownloadDir + '/' + fileName + '.mp3',
    },
  })
    .fetch('GET', url, {
      //... some headers,
      'Content-Type': 'octet-stream',
    })
    .progress({count: 5}, (received, total) => {
      console.log('progress', received / total);
    })
    .then((res) => {
      // the temp file path
      console.log(res);
      console.log('The file saved to ', res.path());
    })
    .catch((err) => {
      console.log(err);
    });
};
const upLoadSong = (url, fileName) => {
  RNFetchBlob.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      //    path: dirs.DownloadDir + '/' + fileName,
    },
  })
    .fetch('POST', url, {
      //... some headers,
      //    'Content-Type': 'octet-stream',
    })
    .uploadProgress({interval: 250}, (written, total) => {
      console.log('uploaded', written / total);
    })

    .then((res) => {
      // the temp file path
      console.log(res);
      // console.log('The file saved to ', res.path());
    })
    .catch((err) => {
      console.log(err);
    });
};

export {upLoadSong, downloadSong};
