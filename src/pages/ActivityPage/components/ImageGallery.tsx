import { ActivityImage } from "../../../models";
import { makeImage } from "../../../hooks/makeImage";
import { Carousel, Image } from "antd";

const ImageGallery = ({ images }: { images: ActivityImage[] }) => {
  const photos = images.map((img) => ({ src: img.id }));
  
  return (
    <Carousel 
      arrows
      autoplay
      style={{width: '300px'}}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          id={photo.src}
          style={{width: '100%'}}
        >
            <Image
              alt="s"
              key={photo.src}
              width="100%"
              src={makeImage(photo.src)}
            />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
