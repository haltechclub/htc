export default function splitExt(filename) {
  return String(filename).split(/\.(?=[^.]+$)/)
}
