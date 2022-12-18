/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from "react";
import { GetBookingsAction } from "~/redux/app/actions/booking";
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
import { Modal, Form, Checkbox } from "antd";
import { BookingCalendarWrapper } from "./styles";
import BookingForm from "./partials/AddBookingForm";
import moment from "moment";
import type { BookingFormFields } from "~/types/booking";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { CreateBooking } from "~/redux/app/actions/booking";

function BookingCalendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DateSelectArg>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetBookingsAction());
  }, []);

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <label>
            <Checkbox
              checked={weekendsVisible}
              onChange={() => setWeekendsVisible(!weekendsVisible)}
            ></Checkbox>
            This week bookings
          </label>
        </div>
        {/* <div className="demo-app-sidebar-section">
          <h2>All bookings ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div> */}
      </div>
    );
  };

  // const renderSidebarEvent = (event: EventApi) => {
  //   return (
  //     <li key={event.id}>
  //       <b>
  //         {formatDate(event.start!, {
  //           year: "numeric",
  //           month: "short",
  //           day: "numeric",
  //         })}
  //       </b>
  //       <i>{event.title}</i>
  //     </li>
  //   );
  // };
  const onSubmit = async (data: BookingFormFields) => {
    dispatch(CreateBooking(data)).then((result) => {
      if (result) {
        const calendarApi = formData?.view.calendar;

        // calendarApi?.unselect();

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
      }
    });
  };

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <BookingCalendarWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={(selectInfo) => {
              form.setFieldsValue({
                startTime: moment(selectInfo.startStr),
                endTime: moment(selectInfo.endStr),
              });
              setIsModalOpen(true);
              setFormData(selectInfo);
            }}
            eventContent={(eventContent) => {
              return (
                <>
                  <b>{eventContent.timeText}</b>
                  <i>{eventContent.event.title}</i>
                </>
              );
            }} // custom render function
            eventClick={(clickInfo: EventClickArg) => {
              if (
                confirm(
                  `Are you sure you want to delete the event '${clickInfo.event.title}'`
                )
              ) {
                clickInfo.event.remove();
              }
            }}
            eventsSet={(events: EventApi[]) => {
              setCurrentEvents(events);
            }} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </BookingCalendarWrapper>
        <>
          <Modal
            title="Add booking"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form onFinish={onSubmit} layout="vertical" form={form}>
              <BookingForm form={form} />
            </Form>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default BookingCalendar;
