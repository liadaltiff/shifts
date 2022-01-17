import axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ShiftContext } from "../../contexts/ShiftContext";
import { UsersContext } from "../../contexts/UsersContext";
import { responseOk } from "../../utils/axios.util";

export const useMakeShift = (date: Date | undefined) => {
  const { stateShift, setStateShift } = useContext(ShiftContext);

  const defaultDetails = {
    name: "",
    person: "",
    time: {
      start: "",
      end: "",
    },
  };

  const [details, setDetails] = useState(defaultDetails);

  const handleChange = (key: string, value: string) => {
    setDetails((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleTimeChange = (key: "start" | "end", e: any) => {
    setDetails((prev) => {
      return {
        ...prev,
        time: {
          ...prev.time,
          [key]: e.target.value,
        },
      };
    });
  };

  const parseDetails = () => {
    return {
      dateProp: date,
      shiftName: details.name,
      shiftPerson: details.person,
      startTimeValue: details.time.start,
      endTimeValue: details.time.end,
    };
  };

  const { stateUsers, setStateUsers } = useContext(UsersContext);

  const users = useMemo(() => {
    return stateUsers.map((user) => user.fullName);
  }, [stateUsers]);

  const createShift = useCallback(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/shifts",
          parseDetails()
        );

        if (!responseOk(response)) {
          throw new Error("response error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendRequest();
  }, [date, details]);

  useEffect(() => {
    if (stateShift) {
      setDetails({
        name: stateShift.shiftName,
        person: stateShift.shiftPerson,
        time: {
          start: stateShift.startTimeValue,
          end: stateShift.endTimeValue,
        },
      });
    } else {
      setDetails(defaultDetails);
    }
  }, [stateShift]);

  useEffect(() => {
    setStateShift(undefined);
    setDetails(defaultDetails);
  }, []);

  return {
    form: {
      data: details,
      setField: handleChange,
      setTimeField: handleTimeChange,
      post: createShift,
      users: users,
    },
  };
};
