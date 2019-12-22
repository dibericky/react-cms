import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Empty as AntdEmpty } from 'antd';

import Modal from './Modal';

export default function Gallery({ items, onImageChange }) {
  const [previewImage, setPreviewImage] = useState();
  const [previewId, setPreviewId] = useState();
  const [previewMetadata, setPreviewMetadata] = useState();
  return (
    <>
      <Container>
        {items.map((item) => (
          item.values.image
            ? (
              <Image
                src={item.values.image}
                key={item.id}
                onClick={() => {
                  setPreviewImage(item.values.image);
                  setPreviewId(item.id);
                  setPreviewMetadata(item.metadata);
                }}
              />
            )
            : <Empty onClick={() => setPreviewId(item.id)} />
        ))}
      </Container>
      <Modal
        isVisible={!!previewId}
        image={previewImage}
        metadata={previewMetadata}
        onChange={(newUrl) => {
          setPreviewImage(newUrl);
          onImageChange(previewId, { image: newUrl });
        }}
        onCancel={() => {
          setPreviewImage();
          setPreviewId();
          setPreviewMetadata();
        }}
      />
    </>
  );
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape({
      image: PropTypes.string.isRequired,
    }).isRequired,
  })),
  onImageChange: PropTypes.func.isRequired,
};
Gallery.defaultProps = {
  items: [],
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    align-items: start;
    height: 100%;
    overflow: auto;
`;

const Image = styled.img`
    border: 1px solid #ccc;
    box-shadow: 0px 0px 6px 0px  rgba(0,0,0,0.3);
    max-width: 100%;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 6px 0px  rgba(0,0,0,0.5);
    }
`;

const Empty = styled(AntdEmpty)`
    cursor: pointer;
`;
