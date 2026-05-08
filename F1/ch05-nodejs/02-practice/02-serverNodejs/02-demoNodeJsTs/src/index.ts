const fname: string = 'anh Điệp đẹp trai 100%'
console.log(`Hello World ${fname}`)
type HandleFunc = () => Promise<string>
const handle: HandleFunc = () => Promise.resolve('Hello Promise!')

handle().then((value) => {
  console.log(value)
})
