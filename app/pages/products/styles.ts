import styled from "styled-components";
export const AddProductWrapper = styled.div`
  .ant-input-number,
  .ant-picker {
    width: 100%;
  }
  .ant-form-item-required {
    width: 100%;
  }
  .add-variant {
    color: #44bd9c;
    cursor: pointer;
  }
`;

export const ActionButtonsWrapper = styled.div`
  font-size: 24px;
  cursor: pointer;
  display: flex;
  gap: 16px;
  .danger-icon {
    color: #dc3444;
  }
  .warning-icon {
    color: #ffc007;
  }
`;

export const ProductTableWrapper = styled.div`
  .ant-table-content {
    overflow: scroll;
  }
  .ant-table-wrapper {
    width: 100%;
  }
`;
