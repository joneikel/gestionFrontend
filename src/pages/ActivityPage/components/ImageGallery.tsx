import { Gallery, Item } from "react-photoswipe-gallery";
import { Activity } from "../../../models";
import { makeImage } from "../../../hooks/makeImage";
import { MutableRefObject } from "react";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

const ImageGallery = ({ activity }: { activity: Activity }) => {
  const photos = activity.images.map((img) => ({ src: img.id }));

  return (
    <Gallery>
      {photos.map((photo) => (
        <Item
          id={photo.src}
          original={makeImage(photo.src)}
          thumbnail={makeImage(photo.src)}
          width="50px"
          height="50px"
        >
          {({ ref, open }) => {
            return <img
              alt="s"
              style={{ margin: 5 }}
              key={photo.src}
              ref={ref as MutableRefObject<HTMLImageElement>}
              width="50px"
              height="50px"
              onClick={() => open()}
              src={makeImage(photo.src)}
            />
          }}
        </Item>
      ))}
    </Gallery>
  );
};

export default ImageGallery;
