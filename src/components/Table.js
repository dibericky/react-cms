import { Table } from 'antd';
import styled from 'styled-components';

export default styled(Table)`
    height: 100%;

    .ant-spin-nested-loading {
        height: 100%;
    }
    .ant-spin-nested-loading .ant-spin-container {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr min-content;
    }
    .ant-spin-nested-loading .ant-spin-container .ant-table {
        overflow: auto;
    }
`;
