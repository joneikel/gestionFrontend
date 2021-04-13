import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';

const EcUploader = ({ onChange, value }: EcUploaderProps) => {

  const [fileList, setFileList] = useState<Array<UploadFile<any>>>();

  const _onChange = (fileList: UploadChangeParam<UploadFile<any>>) => {
    setFileList(fileList.fileList);
    onChange && onChange(fileList.fileList);
  };

  const onPreview = async (file: UploadFile<any>) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj || new Blob());
        reader.onload = () => resolve(reader.result?.toString());
      });
    }
    const image = new Image();
    image.src = src || "";
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Upload
      style={{display: 'inline-block'}}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={fileList}
      onChange={_onChange}
      onPreview={onPreview}
      beforeUpload={(file: RcFile, fileList: RcFile[]) => {
        return false;
      }}
    >
      Agregar
    </Upload>
  )
}

export default EcUploader;

type EcUploaderProps = {
  onChange?: Function,
  value?: Array<any>
}