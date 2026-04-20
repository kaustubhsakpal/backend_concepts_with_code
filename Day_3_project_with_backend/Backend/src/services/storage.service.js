const ImageKit =require('@imagekit/nodejs')
require('dotenv').config();
const imagekit = new ImageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATEKEY
})

async function uplodfile(buffer){
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.png",
  });
 return result
}

module.exports=uplodfile;