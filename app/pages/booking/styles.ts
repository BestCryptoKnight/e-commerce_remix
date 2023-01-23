import styled from "styled-components";

export const BookingCalendarDateWrapper = styled.div`
  .ant-picker {
    width: 100%;
  }
`;

export const BookingCalendarWrapper = styled.div`
  .fc .fc-button-primary {
    color: #fff;
    border-color: #44bd9c;
    background: #44bd9c;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
  }
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background: #25478a;
    color: #fff;
  }
  .fc-v-event {
    background: #44bd9c;
    border: none;
  }

  @media only screen and (max-width: 768px) {
    .fc .fc-toolbar {
      display: block !important;
    }
  }
`;

export const BookingTableWrapper = styled.div`
  .ant-table-content {
    overflow: scroll;
  }
  .ant-table-wrapper {
    width: 100%;
  }
`;
