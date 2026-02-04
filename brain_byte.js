
let array = new ArrayBuffer(16)

function asciiToBytes(string)
{
    const u8 = new Uint8Array(string.length)
    for(let i=0; i<string.length; i++)
    {
        u8[i] = string.charCodeAt(i) & 0xFF
    }
    return u8
}

function bytesToAscii(u8) {
  let string = ""
  for (let i = 0; i < u8.length; i++) string += String.fromCharCode(u8[i])
  return string
}

function encode_writer(name, age, roll, siblings)
{
    const name_bytes = asciiToBytes(name)
    if(name_bytes.length > 255) {
        throw new Error("Name too long then 255")
    }

    let total = name_bytes.length + 1 + 1 + 1 + 1
    const buffer = new ArrayBuffer(total)
    const u8 = new Uint8Array(buffer)

    u8[0] = age & 0xFF
    u8[1] = roll & 0xFF
    u8[2] = siblings & 0xFF
    u8[3] = name_bytes.length & 0xFF

    u8.set(name_bytes, 4)
    return u8
}

function decode_recorder(byte)
{
    if (byte.length < 4) 
    {
        throw new Error("Invalid record (too short)")
    }

    const age = byte[0]
    const roll = byte[1]
    const siblings = byte[2]
    const nameLen = byte[3]

    const nameByte = byte.slice(3, 3+nameLen+1)
    const name = bytesToAscii(nameByte)
    return {age, roll, siblings, name}
}

function main()
{
    let bytes = encode_writer("danishk kr sinha", 21, 44, 1)
    let {age, roll, siblings, name} = decode_recorder(bytes)
    console.log(age, roll, siblings, name)

}

main()