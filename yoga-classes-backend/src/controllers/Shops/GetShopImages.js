const bucketname = process.env.BUCKET_NAME;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
async function GetShopImages(shops, s3Client) {
  try {
    return await Promise.all(
      shops.map(async (shop) => {
        if (shop.image) {
          const getObjectParams = {
            Bucket: bucketname,
            Key: shop.image.split("/").pop(),
          };

          const command = new GetObjectCommand(getObjectParams);
          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });

          return { ...shop.toJSON(), image: signedUrl };
        }
        return shop.toJSON();
      })
    );
  } catch (error) {
    console.log(error);
    return shops; // Return original shops if error occurs
  }
}


exports.GetShopImages = GetShopImages;
