/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from "react";
import type {
  EventApi,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { Button, Modal, Row, Col, DatePicker, Form, Input, Select } from "antd";
import { GetProductsAction } from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import type { ProductType } from "~/types/products";
import { ProductTypeEnum } from "~/types/products";
import type { BookingFormFields } from "~/types/booking";

function BookingCalendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DateSelectArg>();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={() => setWeekendsVisible(!weekendsVisible)}
            ></input>
            This week bookings
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All bookings ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start!, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };
  const onSubmit = async (data: BookingFormFields) => {
    const calendarApi = formData?.view.calendar;

    calendarApi?.unselect(); // clear date selection

    if (data.title) {
      calendarApi?.addEvent({
        id: createEventId(),
        title: data.title,
        start: formData?.startStr,
        end: formData?.endStr,
        allDay: formData?.allDay,
      });
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={(selectInfo) => {
            setIsModalOpen(true);
            setFormData(selectInfo);
          }}
          eventContent={(eventContent) => {
            console.log(eventContent);
            return (
              <>
                <b>{eventContent.timeText}</b>
                <i>{eventContent.event.title}</i>
              </>
            );
          }} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />

        <>
          <Modal
            title="Add booking"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form<BookingFormFields>
              onFinish={onSubmit}
              layout="vertical"
              form={form}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Title of booking"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter title of the booking...!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Customer full name "
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the full name...!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Customer phone number "
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer phone number...!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Customer email "
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer email address...!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="date/time"
                    label="Date/Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select the data and time...!",
                      },
                    ]}
                  >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="services" label="Services">
                    <Select
                      loading={loading}
                      mode="multiple"
                      options={data
                        .filter(
                          (product: ProductType) =>
                            product.type == ProductTypeEnum.SERVICE
                        )
                        .map((t: ProductType) => ({
                          value: t.id,
                          label: t.title,
                        }))}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Button type="primary" htmlType="submit">
                    submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default BookingCalendar;
