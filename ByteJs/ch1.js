
// const mem = new Uint8Array(4)

// mem[0] = 255
// mem[1] = 1
// mem[2] = 65
// mem[3] = 0

// console.log(mem)

// const buff = Buffer.alloc(4);
// buff.writeUInt8(255, 0)
// buff.writeUInt8(254, 1)
// buff.writeUInt8(253, 2)
// buff.writeUInt8(252, 3)

// for(let i=0; i< buff.length; i++) {
//     console.log(buff[i])
// }

// const buff1 = new ArrayBuffer(8)
// const u8 = new Uint8Array(buff1)
// const u16 = new Uint16Array(buff1)

// u8[0] = 11
// u8[1] = 22
// u16[2] = 55

// console.log(u16[0])

// const u8 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
// console.log(u8.length)
// console.log(u8.byteLength)
// console.log(u8.byteOffset)
// console.log(u8.buffer)

// u8.set([20, 21, 22], 0)
// console.log(u8)

// console.log(u8.subarray(2, 5))

// const x = 5643
// console.log(x & 0xFF)
// console.log(x >> 8) 

// const mem = new Uint8Array(4)
// mem[0] = 255
// mem[1] = 1
// mem[2] = 65
// mem[3] = 0

// console.log(mem[1])


const buffer = new ArrayBuffer(4)
const u8 = new Uint8Array(buffer)
const u32 = new Uint32Array(buffer)

u8[0] = 1
u8[1] = 2
u8[2] = 3
u8[3] = 4

console.log(u32[0]&0xFF)
console.log((u32[0]>>8) &0xFF)
console.log((u32[0]>>16) &0xFF)
console.log((u32[0]>>24) &0xFF)
