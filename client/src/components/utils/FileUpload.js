import React , { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload() {


    const [Images, setImages] = useState([]);

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);

        Axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.daata.success) {


                    setImages([...Images, response.data.filePath]) //Images state에 있는 모든 데이터를 가져옴
                } else {
                    alert('파일을 저장하는데 실패했습니다.');
                }
            })

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                        <div
                            style={{
                                width: 300, height: 240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                )}
            </Dropzone>
        </div >
    )
}

export default FileUpload
