export default function (bytes) {
  const e = (Math.log(bytes) / Math.log(1e3)) | 0;
  return +(bytes / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
}
