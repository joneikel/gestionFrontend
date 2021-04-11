import React, { useContext, useState } from "react";
import { Image, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosInstance } from "axios";
import { baseURL, useAxios } from "../../../hooks/useAxios";
import { ActivityImage } from "../../../models";

const ImageDeleter = ({ images }: { images: ActivityImage[] }) => {

  const axios = useAxios();
  const [_images, setImages] = useState(images);
  const handleDelete = (id: string) => {
    deleteImage(axios, id)
      .then((i: any) => setImages(_images.filter(image => image.id !== i.id)));
  }

  return (
    <div style={{ display: "flex" }}>
      {_images.map((image) => (
        <div
          style={{
            padding: 8,
            marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 8,
            backgroundColor: "#fafafa",
            border: "1px dashed #d9d9d9",
            width: "106px",
            height: "106px",
            position: "relative",
            borderRadius: 4
          }}
        >
          <Image
            height="86px"
            src={`${baseURL}/image/${image.id}`}
            placeholder={
              <Image src={`${baseURL}/placeholder-image/${image.id}`} />
            }
          />
          <Popconfirm title="¿Seguro desea borrar esta imagen?" onConfirm={() => handleDelete(image.id)}>
            <div className="image-deleted-overlay" onClick={() => console.log("confirmar")}>
              <DeleteOutlined />
            </div>
          </Popconfirm>

        </div>
      ))}
    </div>
  );
};

export default ImageDeleter;

async function deleteImage(axios: AxiosInstance, id: string) {
  const deleted = await axios.delete(`/image/${id}`);
  return deleted.data;
}